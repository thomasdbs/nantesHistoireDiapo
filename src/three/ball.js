import * as THREE from 'three';

const material = () => new THREE.MeshNormalMaterial();


export default () => {

    const group = new THREE.Group();

    const geometryBalle = new THREE.SphereGeometry(13,32,32);
    const balle = new THREE.Mesh(geometryBalle, material(0xFFFFFF));
    balle.position.set(0,0,0);

    group.add(balle);
    group.traverse(m => (m.castShadow = true));

    return { group, balle, geometryBalle };
};
