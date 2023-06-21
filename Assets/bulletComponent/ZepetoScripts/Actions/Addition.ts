import { Button, Text } from 'UnityEngine.UI';
import { Room } from 'ZEPETO.Multiplay';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World'

export default class Addition extends ZepetoScriptBehaviour {

    @SerializeField() private multiplay: ZepetoWorldMultiplay;
    private value: number;
    @SerializeField() private disp: Text;
    @SerializeField() private room: Room

    Start() {    
        this.value = 0;
        this.gameObject.GetComponent<Button>().onClick.AddListener(()=>
        {
            this.Increase();
        })
        this.multiplay.RoomJoined += (room: Room) => {
            this.room = room;
            
        }
    }



    Increase(){

        this.value += 1; 
        console.log(`This is the value: ${this.value}`)
        this.disp.text = this.value.toString();
        this.room.Send(MESSAGE.IncreaseLevel, "Hello world")

    }

}

enum MESSAGE {


    /** Adding level */

    IncreaseLevel = "IncreaseLevel",
    ReduceLevel = "ReduceLevel",

}