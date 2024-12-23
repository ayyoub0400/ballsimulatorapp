class ProjectileMotion {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isSimulating = false;
        this.trajectory = [];
        this.currentTime = 0;
        this.timeStep = 0.02;
        this.scale = 10; // pixels per meter

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Initialize parameters
        this.resetSimulation();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    resetSimulation() {
        this.velocity = parseFloat(document.getElementById('velocity').value);
        this.angle = parseFloat(document.getElementById('angle').value);
        this.gravity = parseFloat(document.getElementById('gravity').value);
        
        this.trajectory = [];
        this.currentTime = 0;
        this.isSimulating = false;
        
        // Calculate initial velocities
        const angleRad = this.angle * Math.PI / 180;
        this.vx = this.velocity * Math.cos(angleRad);
        this.vy = this.velocity * Math.sin(angleRad);
        
        // Calculate theoretical values
        this.calculateTheoretical();
        
        // Clear and draw initial state
        this.clear();
        this.drawGround();
        this.drawProjectile(0, 0);
    }

    calculateTheoretical() {
        const angleRad = this.angle * Math.PI / 180;
        const v0 = this.velocity;
        const g = this.gravity;

        // Maximum height
        const maxHeight = (v0 * Math.sin(angleRad)) ** 2 / (2 * g);
        document.getElementById('maxHeight').textContent = maxHeight.toFixed(2) + ' m';

        // Range
        const range = (v0 * v0 * Math.sin(2 * angleRad)) / g;
        document.getElementById('range').textContent = range.toFixed(2) + ' m';

        // Time of flight
        const flightTime = (2 * v0 * Math.sin(angleRad)) / g;
        document.getElementById('flightTime').textContent = flightTime.toFixed(2) + ' s';
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGround() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height - 30);
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 30);
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawProjectile(x, y) {
        const screenX = x * this.scale + 50;
        const screenY = this.canvas.height - (y * this.scale + 30);
        
        this.ctx.beginPath();
        this.ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fill();
    }

    drawTrajectory() {
        if (this.trajectory.length < 2) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(
            this.trajectory[0].x * this.scale + 50,
            this.canvas.height - (this.trajectory[0].y * this.scale + 30)
        );
        
        for (let i = 1; i < this.trajectory.length; i++) {
            this.ctx.lineTo(
                this.trajectory[i].x * this.scale + 50,
                this.canvas.height - (this.trajectory[i].y * this.scale + 30)
            );
        }
        
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    update() {
        if (!this.isSimulating) return;

        const x = this.vx * this.currentTime;
        const y = this.vy * this.currentTime - 0.5 * this.gravity * this.currentTime * this.currentTime;

        this.trajectory.push({x, y});

        if (y < 0) {
            this.isSimulating = false;
            return;
        }

        this.clear();
        this.drawGround();
        this.drawTrajectory();
        this.drawProjectile(x, y);

        this.currentTime += this.timeStep;
        requestAnimationFrame(() => this.update());
    }

    start() {
        if (!this.isSimulating) {
            this.isSimulating = true;
            this.update();
        }
    }
}

// Initialize simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('simulationCanvas');
    const simulation = new ProjectileMotion(canvas);

    // Add event listeners for controls
    document.getElementById('startBtn').addEventListener('click', () => {
        simulation.start();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        simulation.resetSimulation();
    });

    // Add event listeners for sliders
    const sliders = ['velocity', 'angle', 'gravity'];
    sliders.forEach(id => {
        const slider = document.getElementById(id);
        const value = document.getElementById(id + 'Value');
        
        slider.addEventListener('input', () => {
            value.textContent = slider.value;
            simulation.resetSimulation();
        });
    });
});
