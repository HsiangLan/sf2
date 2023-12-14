import { SCROLL_BOUNDRY, STAGE_HEIGHT, STAGE_PADDING, STAGE_WIDTH } from '../constants/stage.js';

export class Camera {
    constructor(x, y, fighters) {
        this.position = { x, y };
        this.fighters = fighters;
        // 初始化相機的位置和要追蹤的角色列表
    }

    update(time, context) {
        this.position.y = -6 + Math.floor(Math.min(this.fighters[1].position.y, this.fighters[0].position.y) / 10); 
        // 設定 y 軸位置，當角色跳躍時將鏡頭往上移動
        const lowX = Math.min(this.fighters[1].position.x, this.fighters[0].position.x);
        const highX = Math.max(this.fighters[1].position.x, this.fighters[0].position.x);

        if (highX - lowX > context.canvas.width - SCROLL_BOUNDRY * 2) {
            const midPoint = (highX - lowX) / 2;
            this.position.x = lowX + midPoint - (context.canvas.width / 2);
        }
        else {
            for (const fighter of this.fighters) {
                if (fighter.position.x < this.position.x + SCROLL_BOUNDRY) {
                    this.position.x = fighter.position.x - SCROLL_BOUNDRY;
                } else if (fighter.position.x > this.position.x + context.canvas.width - SCROLL_BOUNDRY) {
                    this.position.x = fighter.position.x - context.canvas.width + SCROLL_BOUNDRY
                }
            }
        }
        // 限制相機的移動範圍
        
        //max limit
        if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING;
        if (this.position.x > STAGE_WIDTH + STAGE_PADDING - context.canvas.width) { 
            this.position.x = STAGE_WIDTH + STAGE_PADDING - context.canvas.width;
        }
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y > STAGE_HEIGHT - context.canvas.height) {
            this.position.y = STAGE_HEIGHT - context.canvas.height;
        }
    }
}