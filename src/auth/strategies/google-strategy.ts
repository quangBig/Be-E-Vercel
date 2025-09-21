import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        try {
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            console.log('Profile:', profile ? JSON.stringify(profile, null, 2) : 'No profile');

            if (!profile) {
                console.error('No profile data received from Google');
                return done(new Error('Không thể lấy thông tin từ Google'), null);
            }

            // Kiểm tra xem profile._json có tồn tại không
            const userData = profile._json || {};
            console.log('User Data from Google:', JSON.stringify(userData, null, 2));

            const email = userData.email || (profile.emails && profile.emails[0] && profile.emails[0].value);
            const name = userData.name || profile.displayName || 'User';
            const googleId = userData.sub || profile.id;

            if (!email) {
                console.error('No email found in profile:', profile);
                return done(new Error('Không thể lấy địa chỉ email từ tài khoản Google'), null);
            }

            const user = await this.authService.validateGoogleUser({
                email,
                name,
                googleId,
            });

            const payload = {
                email: user.email,
                sub: user._id,
                role: user.role
            };

            const token = this.jwtService.sign(payload);

            done(null, {
                user: user,
                access_token: token
            });
        } catch (error) {
            console.error('Error in Google OAuth:', error);
            done(error, null);
        }
    }
}