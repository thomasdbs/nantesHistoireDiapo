import * as THREE from 'three';
import TweenMax from 'gsap';

const material = color => new THREE.MeshPhongMaterial({
	color: color,
	side: THREE.DoubleSide,
	emissive: 0x000000,
	specular: 0xffffff,
	flatShading: true,
	transparent: true,
});

const geometry = radius => new THREE.SphereGeometry(radius, 8, 6);

class Particle {
	constructor() {
		this.group = new THREE.Group();
		const size = Math.random()/3+0.1;
		const up = new THREE.Mesh(geometry(size), material(0xFFFFFF));
		this.group.add(up);
		this.group.position.set(this.randomNumberExcluding(-50,50,-20,20), this.randomNumberExcluding(-30,30,-10,10), Math.random()*2);
	}

	randomNumberBetween(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomNumberExcluding(min, max, minExcluded, maxExcluded) {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		return (num >= minExcluded && num <= maxExcluded) ? this.randomNumberExcluding(min, max, minExcluded, maxExcluded) : num;
	}

	nextSlide(num) {
		let delay = 8;
		// Vers un point à droite de l'écran
		TweenMax.to(this.group.position, 5, {
			x: '50',
			y: () => {
				return this.randomNumberBetween(-40,40);
			}
		});

	}

	circlePoints(num) {
		const angle = Math.random() * Math.PI * 2;
		const minCircle = 15;
		const maxCircle = 30;
		const radius = minCircle + Math.random() * (maxCircle - minCircle);
		let delay = 8;

		//Random position entre 2 cercles
		TweenMax.to(this.group.position, 5, {
			x: () => {
				return Math.cos(angle) * radius;
			},
			y: () => {
				return Math.sin(angle) * radius;
			},
		});
		//Random position sur le petit cercle
		TweenMax.to(this.group.position, 5, {
			x: () => {
				return Math.cos(angle) * minCircle;
			},
			y: () => {
				return Math.sin(angle) * minCircle;
			},
		}).delay(delay);
		//Random position sur le grand cercle
		TweenMax.to(this.group.position, 5, {
			x: () => {
				return Math.cos(angle) * maxCircle;
			},
			y: () => {
				return Math.sin(angle) * maxCircle;
			},
		}).delay(delay*2);
		//Random position entre les 2 cercles
		TweenMax.to(this.group.position, 5, {
			x: () => {
				return Math.cos(angle) * radius;
			},
			y: () => {
				return Math.sin(angle) * radius;
			},
		}).delay(delay*3);
		//Si nombre pair
		if (num%2 == 0) {
			//Random position sur le petit cercle
			TweenMax.to(this.group.position, 5, {
				x: () => {
					return Math.cos(angle) * minCircle;
				},
				y: () => {
					return Math.sin(angle) * minCircle;
				},
			}).delay(delay*4);
		}
		//Si nombre impair
		else {
			//Random position sur le grand cercle
			TweenMax.to(this.group.position, 5, {
				x: () => {
					return Math.cos(angle) * maxCircle;
				},
				y: () => {
					return Math.sin(angle) * maxCircle;
				},
			}).delay(delay*4);
		}
		//Vers un point à droite de l'écran
		TweenMax.to(this.group.position, 5, {
			x: '50',
			y: '0'
		}).delay(delay*5);
		//Vers un point en haut de l'écran
		TweenMax.to(this.group.position, 5, {
			x: '0',
			y: '30'
		}).delay(delay*5+delay/2);
		//Vers un point à gauche de l'écran
		TweenMax.to(this.group.position, 5, {
			x: '-50',
			y: '0'
		}).delay(delay*6);
		//Vers un point en bas de l'écran
		TweenMax.to(this.group.position, 5, {
			x: '0',
			y: '-30'
		}).delay(delay*6+delay/2);
		//Si nombre pair
		if (num%2 == 0) {
			//Vers un point à droite de l'écran
			TweenMax.to(this.group.position, 5, {
				x: '50',
				y: '0'
			}).delay(delay*7);
			//Vers un point en haut de l'écran
			TweenMax.to(this.group.position, 5, {
				x: '0',
				y: '30'
			}).delay(delay*7+delay/2);
			//Random position sur le petit cercle
			TweenMax.to(this.group.position, 5, {
				x: () => {
					return Math.cos(angle) * minCircle;
				},
				y: () => {
					return Math.sin(angle) * minCircle;
				},
			}).delay(delay*8);
		}
		//Si nombre impair
		else {
			//Vers un point à gauche de l'écran
			TweenMax.to(this.group.position, 5, {
				x: '-50',
				y: '0'
			}).delay(delay*7);
			//Vers un point en haut de l'écran
			TweenMax.to(this.group.position, 5, {
				x: '0',
				y: '30'
			}).delay(delay*7+delay/2);
			//Random position entre les 2 cercles
			TweenMax.to(this.group.position, 5, {
				x: () => {
					return Math.cos(angle) * radius;
				},
				y: () => {
					return Math.sin(angle) * radius;
				},
			}).delay(delay*8);
		}
		const timeout2 = setTimeout(() => {
			this.circlePoints(num);
		}, delay*9*1000);

	}

}

export default () => {
	const group = new THREE.Group();
	const particles = [];
	for (let i = 0; i <= 300; i++) {
		const p = new Particle();
		particles.push(p);
		group.add(p.group);
	}
	return { group, particles };
};
