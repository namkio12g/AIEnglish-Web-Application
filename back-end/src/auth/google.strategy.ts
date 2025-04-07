import { PassportStrategy } from "@nestjs/passport";
import { Strategy,VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from './auth.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(private configService:ConfigService){
      
        const clientID = configService.get<string>('google_client_id');
        const clientSecret = configService.get<string>(
          'google_client_secret',
        );

        if (!clientID || !clientSecret) {
          throw new Error('Google client ID and secret must be defined');
        }
        super({
          clientID: clientID,
          clientSecret: clientSecret,
          callbackURL: 'http://localhost:3000/auth/google-redirect',
          scope: ['email', 'profile'],
        });
    }


     async validate(
        _accessToken: string,
      _refreshToken: string,
      profile: any,
    done: VerifyCallback,): Promise<any> {
       const { displayName, emails, photos, id } = profile;
          
        const user = {
          email: emails[0].value,
          name: displayName,
          avatar: photos[0].value,
          googleId: id,
        };
        done(null, user);
    }
}

