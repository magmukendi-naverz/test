import {GameObject, Rect, Sprite, Texture, Texture2D, Vector2, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { UserInfo, WorldMultiplayContent, ZepetoWorldHelper, ZepetoWorldMultiplay } from 'ZEPETO.World';
import { Image, Text} from 'UnityEngine.UI';
import ZepetoPlayersManager from '../Zepeto Multiplay Component/ZepetoScript/Player/ZepetoPlayersManager';
import { Room } from 'ZEPETO.Multiplay';
import { ZepetoCamera } from 'ZEPETO.Character.Controller';


/** Did not implement this feature using the enum */
/**
 * 
 * 
export enum PlayerNumber {
    PLAYER1, PLAYER2, PLAYER3, PLAYER4, PLAYER5, PLAYER6, PLAYER7, PLAYER8, PLAYER9, PLAYER10,
    PLAYER11, PLAYER12, PLAYER13, PLAYER14, PLAYER15, PLAYER16, PLAYER17, PLAYER18, PLAYER19,
    PLAYER20, PLAYER21, PLAYER22, PLAYER23, PLAYER24,
}
*/
export default class ProfileImageLoader extends ZepetoScriptBehaviour {
    
    @SerializeField() private img: Image;
    @SerializeField() private userId: Text;
    @SerializeField() private numberOfFollower: Text;
    @SerializeField() private numberOfFollowing: Text;
    @SerializeField() private createdDate: Text
    
    private tries: number = 0;
    private maxTries: number = 10;
    @Header("Multiplay GameObject")
    @SerializeField() private multiplay: ZepetoWorldMultiplay;
    private room: Room;

    Start() {
        console.log("Start");

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
        this.GetUserDetails(player.zepetoUserId)
    }


    // A function to collect the user Pict, the user name, follower count, following number and the date the user joined.
    private GetUserDetails(userId)
    {
        ZepetoWorldHelper.GetProfileTexture(userId, (texture: Texture) => {
            this.img.sprite = this.GetSprite(texture);
        }, (error) => {
            console.log(error);
        });
        let userDetail =  WorldMultiplayContent.instance.GetUserInfo(userId)
        this.numberOfFollower.text = `Follower: ${userDetail.followerCount.toString()}`;
        this.numberOfFollowing.text = `Following: ${userDetail.followingCount.toString()}`;        
        this.userId.text = `UserId:${userDetail.name}`;
        this.createdDate.text = `creationDate: ${this.ConvertBigIttoDate(userDetail.userRegistrationDate)}`
    }

    //This function convert the bigint into readable date [YYYY.MM.DD]
    private ConvertBigIttoDate(data:bigint)
    {
        const dateInNumber = parseInt(data.toString())
        const timeInSeconds:number = Math.floor(dateInNumber/1000);
        const d = new Date(dateInNumber);
        const dateFormatted = `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2,'0')}.${d.getDate().toString().padStart(2,'0')}`; 
        return dateFormatted
    }
}