import {Component, OnInit, NgZone, ViewChild, ElementRef, Input, SimpleChanges, OnChanges} from "@angular/core";
import {Observable} from "rxjs";
import {MediaPlayerService} from "./media-player.service";

declare let videojs;

@Component({
  selector: 'mod-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnChanges {
  @ViewChild('timeInput') timeInput: ElementRef;
  @Input("playerName") playerName: any;

  private player: any;
  private intervalHolder: any;

  videoLoaded: boolean;

  constructor(private mediaPlayerService: MediaPlayerService,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.setVideoPlayer(undefined);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.playerName) {
      this.setVideoPlayer(this.playerName);
    }
  }


  setVideoPlayer(playerName: string) {
    this.mediaPlayerService.fetchVideo(playerName).subscribe(
      video => {
        this.ngZone.run(() => {
          this.videoLoaded = true;
          setTimeout(() => this.initVideoPlayer(video), 0);
        });
      }
    );
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
      output += `${hrs}:${(mins < 9 ? "0" : "")}`;
    }


    output += `${mins}:${(Number(secs.toFixed(0)) < 10 ? "0" : "")}`;
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
