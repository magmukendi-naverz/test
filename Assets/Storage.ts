import { Input, KeyCode } from 'UnityEngine'
import { Text } from 'UnityEngine.UI';
import { Room, RoomBase } from 'ZEPETO.Multiplay';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import { RuntimeAnimatorController, Object, Animator, AnimatorClipInfo, Resources,CharacterController, AnimationClip, WaitForSeconds, AnimatorOverrideController, Mathf, WaitForEndOfFrame} from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';

import { Player } from 'ZEPETO.Multiplay.Schema';

export default class Storage extends ZepetoScriptBehaviour {

    
    private room: RoomBase;
    @HideInInspector() public zepetoPlayer: ZepetoPlayer; 
    @HideInInspector() public multiplay: ZepetoWorldMultiplay;
    public value: Text;

    public txt:Text;
    Start() {    

        this.multiplay = Object.FindObjectOfType<ZepetoWorldMultiplay>();
        this.multiplay.RoomJoined += (room: Room) =>
        {
            this.room = room;
        }        
    }

    Update()
    {
        if(Input.GetKey(KeyCode.DownArrow))
        {
            console.log("Going down");
            this.txt.text = "going down"

            this.room.Send("level", "")
        }
        else{
            this.txt.text = "normal"
            }
    }

}