'use strict';

class Pencil {

    // create Pencil.js instance
    // [[ CanvasRenderingContext2D ]]
    constructor(context2d) {
        this.ctx = context2d;
    }

    // clear whole frame
    // [[ ]]
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    // draw image to the canvas
    // [[ image, sx, sy, sw, sh, dx, dy, dw, dh, rad ]]
    drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh, rad) {
        if (rad === 0) {
            this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
        else {
            this.ctx.save();
            this.ctx.translate(dx + dw/2, dy + dh/2);
            this.ctx.rotate(rad);
            this.ctx.drawImage(image, sx, sy, sw, sh, -(dw/2), -(dh/2), dw, dh);
            this.ctx.restore();
        }
    }

    // complete path started with beginPath with a fill
    // [[ color ]]
    fill(c) {
        if (c !== undefined)
            this.ctx.fillStyle = c;
        this.ctx.fill();
    }

    // complete path started with beginPath with a stroke
    // [[ color ]]
    stroke(c) {
        if (c !== undefined)
            this.ctx.strokeStyle = c;
        this.ctx.stroke();
    }

    _getDrawMethod(m) {
        switch (m) {
            case 'stroke': return this.stroke.bind(this);
            case 'fill': return this.fill.bind(this);
            default: {
                console.warn(`'${m}' is not a valid Pencil drawing method`);
                return this.fill;
            }
        }
    }

    draw(m,c) {
        this._getDrawMethod(m)(c);
    }

    // integration for geometry.js
    // [[ shape, mode, color ]]
    drawShape(s, m, c) {
        switch (s.__proto__.constructor) {
            case Point: {
                this.drawRect(s.x, s.y, 1, 1, c, m);
                break;
            }
            case Circle: {
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                this.draw(m,c);
                break;
            }
            case Line: {
                this.ctx.beginPath();
                this.ctx.moveTo(s.pt1.x, s.pt1.y);
                this.ctx.lineTo(s.pt2.x, s.pt2.y);
                this.draw(m,c);
                break;
            }
            case Rectangle:
            case Square: {
                this.drawRect(s.x, s.y, s.width, s.height, m, c);
                break;
            }
            case Polygon: {
                this.drawPolygon(s.pts, m, c);
                break;
            }
        }
    }

    // draw an array of Points
    // [[ Array<Point>, mode, color ]]
    drawPolygon(pts, m, c) {
        this.ctx.beginPath();
        this.ctx.moveTo(pts[0].x, pts[0].y);
        pts.forEach((v) => {
            this.ctx.lineTo(v.x, v.y);
        });
        this.ctx.lineTo(pts[0].x, pts[0].y);
        this.draw(m,c);
    }

    // draw a rectangle
    // [[ x, y, width, height, mode, color ]]
    drawRect(x, y, w, h, m, c) {
        this.ctx.beginPath();
        this.ctx.rect(x,y,w,h);
        this.draw(m,c);
    }

    // draw Text
    // [[ x, y, mode, text, color, font ]]
    drawText(x, y, m, t, c, f) {
        if (c !== undefined)
            this.ctx[`${m}Style`] = c;
        if (f !== undefined)
            this.ctx.font = f;
        this.ctx[`${m}Text`](t, x, y);
    }
}
