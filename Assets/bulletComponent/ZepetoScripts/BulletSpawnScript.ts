import { Rigidbody, Transform } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'


export default class BulletSpawnScript extends ZepetoScriptBehaviour {

    @SerializeField() private speed: number = 20;
    

    Start() {    

    }

    OnSpawn()
    {
        this.GetComponent<Rigidbody>().velocity = this.transform.forward * this.speed;
    }

}