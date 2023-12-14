export class BackgroundAnimation {
    constructor (image, frames, animation, startFrame = 0) {
        this.image = image;
        this.frames = new Map(frames);
        this.animation = animation;
        this.animationTimer = 0;
        this.animationFrame = startFrame;
        this.frameDelay = animation[this.animationFrame][1];
    }

    update(time) {
        if (time.previous > this.animationTimer + this.frameDelay) {
            // 檢查是否到達下一個動畫框架的時間
            this.animationFrame += 1;
            if (this.animationFrame >= this.animation.length) {
                this.animationFrame = 0;
                // 如果動畫框架索引超出範圍，則重新回到第一個框架
            }

            this.frameDelay = this.animation[this.animationFrame][1];
            // 更新當前框架的延遲時間
            this.animationTimer = time.previous;
            // 重設動畫計時器
        }
    }

    draw (context, x, y) {
        const [frameKey] = this.animation[this.animationFrame];
        // 從當前動畫框架中獲取框架
        const [frameX, frameY, frameWidth, frameHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.image,
            frameX, frameY, frameWidth, frameHeight,
            x, y, frameWidth, frameHeight,
        );
        //將圖像的指定框架繪製到畫布上
    }
}