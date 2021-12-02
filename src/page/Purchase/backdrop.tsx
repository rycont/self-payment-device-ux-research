import React, { useEffect, useRef } from 'react'

export const useCanvas = (
  func: (board: CanvasRenderingContext2D) => void,
  props: React.CanvasHTMLAttributes<HTMLCanvasElement>
) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const context = ref.current?.getContext('2d')
    if (context) {
      func(context)
    } else alert('Failed to initialize canvas')
  }, [])

  const drawboard = (
    <canvas
      {...props}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={ref}
    />
  )
  return {
    drawboard,
  }
}

abstract class Sprite {
  abstract draw(context: CanvasRenderingContext2D): void
  abstract move(frame: number): void
}

class Ball extends Sprite {
  radius: number
  x = Math.floor(Math.random() * window.innerWidth)
  y = Math.floor(Math.random() * window.innerHeight)
  color: string
  speed = 5
  health = 1000
  direction = Math.random() * 4
  lastCount = Math.floor(Math.random() * this.health)

  constructor(radius: number, color: string) {
    super()
    this.radius = radius
    this.color = color
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.fillStyle = this.color
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
  }

  move(frame: number) {
    if (this.lastCount-- < 0) {
      this.lastCount = this.health
      this.direction = Math.random() * 4 * Math.PI
    }
    this.x += this.speed * Math.cos(this.direction)
    this.y += this.speed * Math.sin(this.direction)
    if (this.x > window.innerWidth - this.radius) {
      this.direction = Math.PI - this.direction
    }
    if (this.x < this.radius) {
      this.direction = Math.PI - this.direction
    }
    if (this.y > window.innerHeight - this.radius) {
      this.direction *= -1
    }
    if (this.y < this.radius) {
      this.direction *= -1
    }
    return
  }
}

class Drawboard {
  canvas: CanvasRenderingContext2D
  sprites: Sprite[] = []
  constructor(canvas: CanvasRenderingContext2D) {
    this.canvas = canvas
  }
  addSprite(target: Sprite) {
    this.sprites = [...this.sprites, target]
  }
  clear() {
    this.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
  start(frame: number) {
    this.clear()
    for (const sprite of this.sprites) {
      sprite.draw(this.canvas)
      sprite.move(frame)
    }
    requestAnimationFrame(this.start.bind(this))
  }
}

export const drawBackdrop = (ctx: CanvasRenderingContext2D) => {
  const board = new Drawboard(ctx)
  board.addSprite(new Ball(200, '#00ff88'))
  board.addSprite(new Ball(200, '#4200FF'))
  board.addSprite(new Ball(200, '#FF0000'))
  board.addSprite(new Ball(200, '#00ff88'))
  board.addSprite(new Ball(200, '#4200FF'))
  board.addSprite(new Ball(200, '#FF0000'))
  board.addSprite(new Ball(200, '#00ff88'))
  board.addSprite(new Ball(200, '#4200FF'))
  board.addSprite(new Ball(200, '#FF0000'))
  requestAnimationFrame(board.start.bind(board))
}
