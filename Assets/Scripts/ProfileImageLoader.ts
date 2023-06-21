import {GameObject, Rect, Sprite, Texture, Texture2D, Vector2, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldHelper, ZepetoWorldMultiplay } from 'ZEPETO.World';
import { Image } from 'UnityEngine.UI';
import ZepetoPlayersManager from '../Zepeto Multiplay Component/ZepetoScript/Player/ZepetoPlayersManager';
import { Room } from 'ZEPETO.Multiplay';
import { ZepetoCamera } from 'ZEPETO.Character.Controller';

export enum PlayerNumber {
    PLAYER1, PLAYER2, PLAYER3, PLAYER4, PLAYER5, PLAYER6, PLAYER7, PLAYER8, PLAYER9, PLAYER10,
    PLAYER11, PLAYER12, PLAYER13, PLAYER14, PLAYER15, PLAYER16, PLAYER17, PLAYER18, PLAYER19,
    PLAYER20, PLAYER21, PLAYER22, PLAYER23, PLAYER24,
}
export default class ProfileImageLoader extends ZepetoScriptBehaviour {
    public playerNumber : PlayerNumber;
    
    @SerializeField() private img: Image;
    @SerializeField() private userId: Text;
    @SerializeField() private numberOfFollower: Text;
    @SerializeField() private createdDate: Text
    
    private tries: number = 0;
    private maxTries: number = 10;
    @SerializeField() private multiplay: ZepetoWorldMultiplay;
    private room: Room;

    Start() {
        console.log("Start");
        //this.img = this.GetComponent<Image>();
        this.multiplay.RoomJoined += (room:Room)=>{
            this.room = room;            
        }
        this.StartCoroutine(this.LoadProfilePic());
    }

    GetSprite(texture: Texture) {
        let rect: Rect = new Rect(0, 0, texture.width, texture.height);
        return Sprite.Create(texture as Texture2D, rect, new Vector2(0.5, 0.5));
    }
    
    private *LoadProfilePic()
    {
        console.log("Loading Pic..");
        while (!ZepetoPlayersManager.instance.IsReady()) {yield null;}
        
        let player = ZepetoPlayersManager.instance.GetPlayer(this.room.SessionId);
        
        while (player == undefined || player == null)
        {
            console.log("Grabbing Player: " + this.tries);
            player = ZepetoPlayersManager.instance.GetPlayer(this.room.SessionId);
            yield new WaitForSeconds(1.0);
            this.tries++;
            
            if (this.tries >= this.maxTries) {return;}
        }
        ZepetoCamera
    }


    private GetUserImg(userId)
    {
        ZepetoWorldHelper.GetProfileTexture(userId, (texture: Texture) => {
            this.img.sprite = this.GetSprite(texture);
        }, (error) => {
            console.log(error);
        });
    }

    private GetUserInfo(userId)
    {
        ZepetoWorldHelper.GetUserInfo(userId, (texture: Texture) => {
            this.img.sprite = this.GetSprite(texture);
        }, (error) => {
            console.log(error);
        });
    }
}