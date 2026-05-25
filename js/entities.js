// Game Entities - Player and Cookie classes

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.speed = PLAYER_SPEED;
        this.velocityX = 0;
    }

    update() {
        // Apply velocity
        this.x += this.velocityX;

        // Boundary checking
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > CANVAS_WIDTH) {
            this.x = CANVAS_WIDTH - this.width;
        }
    }

    draw(ctx) {
        // Draw player body (simplified Fean character)
        // Main body
        ctx.fillStyle = COLORS.PLAYER;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Outline
        ctx.strokeStyle = COLORS.PLAYER_OUTLINE;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 12, this.y + 12, 8, 8);
        ctx.fillRect(this.x + 40, this.y + 12, 8, 8);

        // Smile
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + 30, this.y + 35, 10, 0, Math.PI);
        ctx.stroke();
    }

    moveLeft() {
        this.velocityX = -this.speed;
    }

    moveRight() {
        this.velocityX = this.speed;
    }

    stop() {
        this.velocityX = 0;
    }

    collidesWith(cookie) {
        return (
            this.x < cookie.x + cookie.size &&
            this.x + this.width > cookie.x &&
            this.y < cookie.y + cookie.size &&
            this.y + this.height > cookie.y
        );
    }
}

class Cookie {
    constructor(x, y, speedMultiplier = 1) {
        this.x = x;
        this.y = y;
        this.size = COOKIE_SIZE;
        this.speed = COOKIE_SPEED_BASE * speedMultiplier;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);

        // Cookie body
        ctx.fillStyle = COLORS.COOKIE;
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Cookie outline
        ctx.strokeStyle = COLORS.COOKIE_OUTLINE;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cookie chips
        ctx.fillStyle = '#8B4513';
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const chipX = Math.cos(angle) * 8;
            const chipY = Math.sin(angle) * 8;
            ctx.beginPath();
            ctx.arc(chipX, chipY, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    isOffScreen() {
        return this.y > CANVAS_HEIGHT;
    }
}
