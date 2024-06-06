import { Vector3 } from 'three';

export interface modelLoaderParams {
    path: string;
    scale?: Vector3;
    position?: Vector3;
    rotation?: Vector3;
}
