"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerNumber = void 0;
const UnityEngine_1 = require("UnityEngine");
const ZEPETO_Script_1 = require("ZEPETO.Script");
const ZEPETO_World_1 = require("ZEPETO.World");
const UnityEngine_UI_1 = require("UnityEngine.UI");
const ZepetoPlayersManager_1 = require("../Zepeto Multiplay Component/ZepetoScript/Player/ZepetoPlayersManager");
var PlayerNumber;
(function (PlayerNumber) {
    PlayerNumber[PlayerNumber["PLAYER1"] = 0] = "PLAYER1";
    PlayerNumber[PlayerNumber["PLAYER2"] = 1] = "PLAYER2";
    PlayerNumber[PlayerNumber["PLAYER3"] = 2] = "PLAYER3";
    PlayerNumber[PlayerNumber["PLAYER4"] = 3] = "PLAYER4";
    PlayerNumber[PlayerNumber["PLAYER5"] = 4] = "PLAYER5";
    PlayerNumber[PlayerNumber["PLAYER6"] = 5] = "PLAYER6";
    PlayerNumber[PlayerNumber["PLAYER7"] = 6] = "PLAYER7";
    PlayerNumber[PlayerNumber["PLAYER8"] = 7] = "PLAYER8";
    PlayerNumber[PlayerNumber["PLAYER9"] = 8] = "PLAYER9";
    PlayerNumber[PlayerNumber["PLAYER10"] = 9] = "PLAYER10";
    PlayerNumber[PlayerNumber["PLAYER11"] = 10] = "PLAYER11";
    PlayerNumber[PlayerNumber["PLAYER12"] = 11] = "PLAYER12";
    PlayerNumber[PlayerNumber["PLAYER13"] = 12] = "PLAYER13";
    PlayerNumber[PlayerNumber["PLAYER14"] = 13] = "PLAYER14";
    PlayerNumber[PlayerNumber["PLAYER15"] = 14] = "PLAYER15";
    PlayerNumber[PlayerNumber["PLAYER16"] = 15] = "PLAYER16";
    PlayerNumber[PlayerNumber["PLAYER17"] = 16] = "PLAYER17";
    PlayerNumber[PlayerNumber["PLAYER18"] = 17] = "PLAYER18";
    PlayerNumber[PlayerNumber["PLAYER19"] = 18] = "PLAYER19";
    PlayerNumber[PlayerNumber["PLAYER20"] = 19] = "PLAYER20";
    PlayerNumber[PlayerNumber["PLAYER21"] = 20] = "PLAYER21";
    PlayerNumber[PlayerNumber["PLAYER22"] = 21] = "PLAYER22";
    PlayerNumber[PlayerNumber["PLAYER23"] = 22] = "PLAYER23";
    PlayerNumber[PlayerNumber["PLAYER24"] = 23] = "PLAYER24";
})(PlayerNumber = exports.PlayerNumber || (exports.PlayerNumber = {}));
class ProfileImageLoader extends ZEPETO_Script_1.ZepetoScriptBehaviour {
    constructor() {
        super(...arguments);
        this.tries = 0;
        this.maxTries = 10;
    }
    Start() {
        console.log("Start");
        this.img = this.GetComponent($typeof(UnityEngine_UI_1.Image));
        this.multiplay.add_RoomJoined((room) => {
            this.room = room;
        });
        this.StartCoroutine(this.LoadProfilePic());
    }
    GetSprite(texture) {
        let rect = new UnityEngine_1.Rect(0, 0, texture.width, texture.height);
        return UnityEngine_1.Sprite.Create(texture, rect, new UnityEngine_1.Vector2(0.5, 0.5));
    }
    *LoadProfilePic() {
        console.log("Loading Pic..");
        while (!ZepetoPlayersManager_1.default.instance.IsReady()) {
            yield null;
        }
        let player = ZepetoPlayersManager_1.default.instance.GetPlayer(this.room.SessionId);
        while (player == undefined || player == null) {
            console.log("Grabbing Player: " + this.tries);
            player = ZepetoPlayersManager_1.default.instance.GetPlayer(this.room.SessionId);
            yield new UnityEngine_1.WaitForSeconds(1.0);
            this.tries++;
            if (this.tries >= this.maxTries) {
                return;
            }
        }
        ZEPETO_World_1.ZepetoWorldHelper.GetProfileTexture(player.zepetoUserId, (texture) => {
            this.img.sprite = this.GetSprite(texture);
        }, (error) => {
            console.log(error);
        });
    }
}
exports.default = ProfileImageLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZUltYWdlTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZmlsZUltYWdlTG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF1RjtBQUN2RixpREFBcUQ7QUFDckQsK0NBQXVFO0FBQ3ZFLG1EQUF1QztBQUN2QyxpSEFBMEc7QUFHMUcsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3BCLHFEQUFPLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUscURBQU8sQ0FBQTtJQUFFLHFEQUFPLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUscURBQU8sQ0FBQTtJQUFFLHFEQUFPLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUscURBQU8sQ0FBQTtJQUFFLHVEQUFRLENBQUE7SUFDekYsd0RBQVEsQ0FBQTtJQUFFLHdEQUFRLENBQUE7SUFBRSx3REFBUSxDQUFBO0lBQUUsd0RBQVEsQ0FBQTtJQUFFLHdEQUFRLENBQUE7SUFBRSx3REFBUSxDQUFBO0lBQUUsd0RBQVEsQ0FBQTtJQUFFLHdEQUFRLENBQUE7SUFBRSx3REFBUSxDQUFBO0lBQ3hGLHdEQUFRLENBQUE7SUFBRSx3REFBUSxDQUFBO0lBQUUsd0RBQVEsQ0FBQTtJQUFFLHdEQUFRLENBQUE7SUFBRSx3REFBUSxDQUFBO0FBQ3BELENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QjtBQUNELE1BQXFCLGtCQUFtQixTQUFRLHFDQUFxQjtJQUFyRTs7UUFLWSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBVyxFQUFFLENBQUM7SUF5Q2xDLENBQUM7SUFyQ0csS0FBSztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxTQUFDLHNCQUFLLEVBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxnQkFBZSxDQUFDLElBQVMsRUFBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRXJCLENBQUMsRUFBQTtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFnQjtRQUN0QixJQUFJLElBQUksR0FBUyxJQUFJLGtCQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLG9CQUFNLENBQUMsTUFBTSxDQUFDLE9BQW9CLEVBQUUsSUFBSSxFQUFFLElBQUkscUJBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8sQ0FBQyxjQUFjO1FBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLDhCQUFvQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUFDLE1BQU0sSUFBSSxDQUFDO1NBQUM7UUFFOUQsSUFBSSxNQUFNLEdBQUcsOEJBQW9CLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFFLE9BQU8sTUFBTSxJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUM1QztZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyw4QkFBb0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEUsTUFBTSxJQUFJLDRCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQUMsT0FBTzthQUFDO1NBQzdDO1FBQ0QsZ0NBQWlCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRTtZQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQS9DRCxxQ0ErQ0MifQ==