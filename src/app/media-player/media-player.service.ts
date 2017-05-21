import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class MediaPlayerService{
  private videoSources: Array<any> = [
    {
      name: 'empowering',
      type:'video/mp4',
      src: 'http://www.html5videoplayer.net/videos/toystory.mp4'
    },
    {
      name: 'connecting',
      type:'application/x-mpegURL',
      src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
    },
    {
      name: 'disrupting',
      type:'video/mp4',
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    }
  ];

  fetchVideo(videoName?: string): Observable<any> {
    if(!videoName){
      return Observable.of(this.videoSources[0]);
    }

    return  Observable.of(this.videoSources.find(video => video.name === videoName));
  }

}
