import {Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef} from "@angular/core";
import {Subscription, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MediaPlayerService} from "./media-player.service";

declare let videojs;

@Component({
  selector: 'mod-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('timeInput') timeInput: ElementRef;

  private subscription: Subscription;
  private player: any;
  private intervalHolder: any;

  videoLoaded: boolean;

  constructor(private route: ActivatedRoute,
              private mediaPlayerService: MediaPlayerService,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('videoName')) {
          this.mediaPlayerService.fetchVideo(params['videoName']).subscribe(
            video => {
              this.ngZone.run(() => {
                this.videoLoaded = true;
                setTimeout(() => this.initVideoPlayer(video), 0);
              });
            }
          );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initVideoPlayer(video: Observable<any>): void {
    if (!this.player) {
      this.player = videojs('videoPlayer');
    }
    this.timeInput.nativeElement.innerHTML = "0:00";
    clearInterval(this.intervalHolder);
    this.player.src(video);
    this.player.load();
    this.player.on("play", () => this.detectTimeChange());
  }

  private static formatTime(time): string {
    let hrs = ~~(time / 3600),
      mins = ~~((time % 3600) / 60),
      secs = time % 60,
      output = '';

    if (hrs > 0) {
      output += `${hrs}:${(mins < 9 ?  "0" : "")}`;
    }


    output += `${mins}:${(Number(secs.toFixed(0)) < 10  ? "0" : "")}`;
    output += secs.toFixed(0);
    return output;
  }

  private detectTimeChange(): void {
    this.ngZone.run(() => {
      this.intervalHolder = setInterval(
        () => this.timeInput.nativeElement.innerHTML = (this.player) ? MediaPlayerComponent.formatTime(this.player.currentTime()) : "", 1000
      );
    });
  }
}
