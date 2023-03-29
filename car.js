// Define the Car class
class Car {
    // Constructor method that initializes the car's properties
    constructor(x, y, width, height) {
      // Set the car's position and size
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  
      // Set the car's initial speed, acceleration, maximum speed, maximum reverse speed, friction, and angle
      this.speed = 0;
      this.acceleration = 0.2;
      this.max_speed = 3;
      this.max_reverse_speed = this.max_speed / 2;
      this.friction = 0.05;
      this.angle = 0;
  
      // Create a Controls object to handle user input
      this.controls = new Controls();
    }
  
    // Public update method that is called every frame
    update() {
      // Call the private move method to update the car's position and angle
      this.#move();
    }
  
    // Private move method that updates the car's position and angle
    #move() {
      // If the forward key is pressed, increase the car's speed
      if (this.controls.forward) {
        this.speed += this.acceleration;
      }
      // If the reverse key is pressed, decrease the car's speed
      if (this.controls.reverse) {
        this.speed -= this.acceleration;
      }
      // Limit the car's speed to the maximum speed
      if (this.speed > this.max_speed) {
        this.speed = this.max_speed;
      }
      // Limit the car's reverse speed to the maximum reverse speed
      if (this.speed < -this.max_reverse_speed) {
        this.speed = -this.max_reverse_speed;
      }
      // Apply friction to slow down the car when no input is detected
      if (this.speed > 0) {
        this.speed -= this.friction;
      }
      if (this.speed < 0) {
        this.speed += this.friction;
      }
      // If the car's speed is close to 0, set it to 0 to avoid jitter
      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      }
      // If the car is moving, update its angle based on user input
      if (this.speed != 0) {
        const flip = this.speed > 0 ? 1 : -1;
  
        // If the left key is pressed, rotate the car to the left
        if (this.controls.left) {
          this.angle += 0.03 * flip;
        }
        // If the right key is pressed, rotate the car to the right
        if (this.controls.right) {
          this.angle -= 0.03 * flip;
        }
      }
      // Update the car's position based on its speed and angle
      this.x -= this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);
    }
  
    // Public draw method that is called every frame to render the car
    draw(ctx) {
      // Save the canvas state
      ctx.save();
  
      // Translate the canvas to the car's position
      ctx.translate(this.x, this.y);
  
      // Rotate the canvas based on the car's angle
      ctx.rotate(-this.angle);
  
      // Draw a rectangle using the car's size
      ctx.beginPath();
      ctx.rect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      // Fill the rectangle
      ctx.fill();
  
      // Restore the canvas state
      ctx.restore();
    }
};