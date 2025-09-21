import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";

import { UpdateCartDto } from "./dto/update-cart.dto";
import { AddToCartDto } from "./dto/create-cart.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    getCart(@Req() req) {
        console.log("decoded user:", req.user);
        return this.cartService.getCart(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addToCart(
        @Req() req,
        @Body() dto: AddToCartDto,
        @Body() body
    ) {
        console.log("req.user:", req.user);
        console.log("dto:", dto);  // phải thấy object
        console.log("body:", body);
        return this.cartService.addToCart(req.user.userId, dto);
    }




    @UseGuards(JwtAuthGuard)
    @Patch("update/:productId")
    updateQuantity(
        @Req() req,
        @Param("productId") productId: string,
        @Body() dto: UpdateCartDto
    ) {
        return this.cartService.updateQuantity(req.user.userId, productId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("remove/:productId")
    removeItem(@Req() req, @Param("productId") productId: string) {
        return this.cartService.removeItem(req.user.userId, productId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("clear")
    clearCart(@Req() req) {
        return this.cartService.clearCart(req.user.userId);
    }
}
