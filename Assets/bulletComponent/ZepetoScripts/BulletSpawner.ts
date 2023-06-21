import { GameObject, Input, KeyCode, Transform, Vector3, Quaternion, Object } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import InstantiateObject from '../../Zepeto Multiplay Component/ZepetoScript/Sample Code/InstantiateObject';


export default class BulletSpawner extends ZepetoScriptBehaviour {

    @SerializeField() private bullet: GameObject;
    @SerializeField() private InitialTransform: Transform;

    Start() {    

    }

    Update()
    {
        if (Input.GetKeyDown(KeyCode.DownArrow))
        {
            this.SpawnBullet(this.InitialTransform.position, this.InitialTransform.rotation)
        }
    } 

    private SpawnBullet( position: Vector3, rotation:Quaternion):void
    {
        let InstantiateBullet = Object.Instantiate(this.bullet, position, rotation)
        
        
    }

}