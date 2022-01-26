import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import { VoxelFactory } from "../../three-core-modules/voxels/VoxelFactory";
import { VoxelObjects } from "../../three-core-modules/voxels/VoxelObjects";
import { VoxelRenderer } from "../../three-core-modules/voxels/VoxelRenderer";
import * as MaterialCatalog from "../../three-resources/catalogs/Materials";
import { Box3, Matrix4, Mesh, Vector2, Vector3 } from "three";

export const VoxelsDemos = () => {};

const getMatrix: any = (
  posx: number,
  posy: number,
  posz: number,
  scale: number
) => {
  var matrix = new THREE.Matrix4();
  var matScale = new THREE.Matrix4().makeScale(scale, scale, scale);
  var matTrans = new THREE.Matrix4().makeTranslation(posx, posy, posz);
  matrix.multiplyMatrices(matScale, matTrans);
  return matrix;
};

export const proceduralCavernsSplitted: any = () => {
  var simplex = new SimplexNoise();

  var matlFn = (i) => {
    let mat: any = MaterialCatalog.ShaderTriplTexColBlend();
    mat.uniforms.custCol = new THREE.Uniform(
      new THREE.Vector4((i % 5) / 5, (i % 3) / 3, 0.0, 1.0)
    );
    // mat = MaterialCatalog.WATER();
    mat.side = THREE.DoubleSide;
    // mat.wireframe = true
    return mat;
  };

  var size = 128;
  var chunkSize = size / 2;
  var range = size / chunkSize;
  var dim = new THREE.Vector3(1, 1, 1).multiplyScalar(chunkSize);
  var count = 0;

  for (var y = -range / 2; y < range / 2; y++) {
    // console.log("Y from " + rangeBox.min.y + " to " + rangeBox.max.y);
    for (var z = -range / 2; z < range / 2; z++) {
      // console.log("Z from " + rangeBox.min.z + " to " + rangeBox.max.z);
      for (var x = -range / 2; x < range / 2; x++) {
        if (count < 8) {
          // console.log("X: " + x)
          var translatMat = getMatrix(x * size, y * size, z * size, 1);
          // rangeBox = new THREE.Box3(new THREE.Vector3(-chunkSize / 2, -chunkSize / 2, -chunkSize / 2), new THREE.Vector3(chunkSize / 2, chunkSize / 2, chunkSize / 2));
          var rangeBox = new THREE.Box3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(size, size, size)
          );
          rangeBox.applyMatrix4(translatMat);
          // console.log("X from " + rangeBox.min.x + " to " + rangeBox.max.x);
          // VoxelFactory.createEntity(VoxelObjects.noise(rangeBox, simplex), matlFn, getMatrix(0, 0, 0, 1));
          var noiseMatrix = getMatrix(0, 0, 0, 4);
          let noiseMatrixInv = new Matrix4();
          noiseMatrixInv.copy(noiseMatrix).invert();
          var noiseBox = rangeBox.clone().applyMatrix4(noiseMatrixInv);
          VoxelFactory.createEntity(
            VoxelObjects.noise(noiseBox, simplex),
            matlFn,
            noiseMatrix
          );
        }
        count++;
      }
    }
  }
  var radius = 4 * 2 * Math.PI;
  var d = 0;
  var translatMat = getMatrix(d, d, d, 1);
  VoxelFactory.createEntity(
    VoxelObjects.sphere(radius, 1 / 4, false),
    matlFn,
    translatMat
  );
};

/**
 * each change to an entity in the octant area will trigger refresh.
 */
export const getLevelMeshes = (level: number) => {
  // retrieve all octree nodes at specific level
  const nodes = VoxelRenderer.renderOctree.findNodesByLevel(level);
  var meshes = nodes
    .filter((node: any) => node.data && node.data.geom)
    .map((node: any, i: number) => {
      const geom = node.data.geom;
      const mats = applyMat(geom);
      // return <mesh key={i} args={[geom, mats]} onPointerMove={e => setRaycast(e)}>
      return new Mesh(geom, mats);
    });
  // return (<primitive object={octreeHelper} />)
  return meshes;
};

const applyMat = (geom: THREE.BufferGeometry) => {
  var matFn = VoxelFactory.entities[0].materialFunction;

  var matArr: THREE.Material[] = [];

  geom.groups.forEach((geomGrp, i) => {
    geomGrp.materialIndex = i;
    matArr.push(matFn(i));
  });
  // matsRef.current = [...matArr];
  return matArr;
};
