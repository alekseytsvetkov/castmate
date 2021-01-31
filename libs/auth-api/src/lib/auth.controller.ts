import {
  Controller,
  Get,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@castmate/prisma';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async authend(req, res) {
    const { redirectUri, codeHandler } = req.session;
    const profile = req?.user;

    // Update or create profile and user
    if (!profile) {
      // Redirect with error
      return res.redirect('http://localhost:3333/graphql');
    }

    const existProfile = await this.prisma.profile.findFirst({
      where: {
        provider: profile?.provider,
        serviceId: profile?.serviceId,
      },
    });

    let userId;

    if (existProfile) {
      await this.prisma.profile.update({
        where: { id: existProfile.id },
        data: {
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          name: profile.name,
          avatar: profile.avatar,
        },
      });

      userId = existProfile.userId;
    } else {
      const newProfile = await this.prisma.profile.create({
        data: {
          provider: profile.provider,
          serviceId: profile.serviceId,
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          name: profile.name,
          avatar: profile.avatar,
          user: {
            create: {},
          },
        },
      });

      userId = newProfile.userId;
    }

    // Make auth code
    const tokens = await this.authService.createToken(userId, true);

    // Redirect back with auth code
    return res.redirect(
      `${codeHandler}code=${tokens.code}&redirect=${redirectUri}`
    );
  }

  // Google
  @Get('auth/google')
  authGoogle(
    @Request() req,
    @Response() res,
    @Query('code_handler') codeHandler,
    @Query('redirect_uri') redirectUri
  ) {
    req.session.codeHandler = codeHandler;
    req.session.redirectUri = redirectUri;
    res.redirect(`http://localhost:3333/authwr/google`);
  }

  @Get('authwr/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authWRGoogle() {}

  @Get('authend/google')
  @UseGuards(AuthGuard('google'))
  async authendGoogle(@Request() req, @Response() res) {
    return this.authend(req, res);
  }
}