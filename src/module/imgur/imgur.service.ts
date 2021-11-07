import { HttpException, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';

import HttpCustomStatus from '../../common/enums/http-custom-status.enum';

interface ImgurUploadResponseData {
  status: number,
  success: boolean,
  data: {
    id: string,
    deletedhash: string,
    account_id?: string,
    account_url?: string,
    ad_type?: string,
    title?: string,
    description?: string,
    name: string,
    type: string,
    width: number,
    height: number,
    size: number,
    section?: string,
    vote?: number,
    bandwidth: number,
    animated: boolean,
    favorite: boolean,
    in_gallery: boolean,
    in_most_viral: boolean,
    has_sound: boolean,
    is_ad: boolean,
    nsfw: boolean,
    link: string,
    tags: string[],
    datetime: number,
    mp4: string,
    hls: string
  },
}

@Injectable()
export default class ImgurService {
  private baseUrl = 'https://api.imgur.com/3';

  private getAuthorizationHeader() {
    return {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    };
  }

  uploadImage(file: Express.Multer.File): Promise<string> {
    if (file === undefined) {
      return undefined;
    }
    const data = new FormData();
    console.log(file);
    data.append('image', file.buffer.toString('base64'));
    data.append('type', 'base64');
    console.log();
    return axios({
      method: 'POST',
      url: `${this.baseUrl}/upload`,
      headers: {
        ...this.getAuthorizationHeader(),
        ...data.getHeaders(),
      },
      data,
    })
      .then((response) => {
        const imgurData = response.data as ImgurUploadResponseData;
        return imgurData.data.link;
      })
      .catch(() => {
        throw new HttpException('failed_to_upload', HttpCustomStatus.FAILED_TO_UPLOAD);
      });
  }
}
