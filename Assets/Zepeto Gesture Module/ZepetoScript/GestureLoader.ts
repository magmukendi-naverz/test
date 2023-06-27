import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { CharacterState, LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers, ZepetoScreenTouchpad} from 'ZEPETO.Character.Controller';
import { OfficialContentType, WorldService, ZepetoWorldContent, Content } from 'ZEPETO.World';
import { RawImage, Text, Button } from 'UnityEngine.UI';
import { Object, GameObject, Texture2D, Transform, WaitUntil, AnimationClip, WrapMode } from 'UnityEngine';
import Thumbnail from './Thumbnail';

export default class GestureLoader extends ZepetoScriptBehaviour {

    @SerializeField() private _closeButton : Button;
    @HideInInspector() public contents: Content[] = [];
    @HideInInspector() public thumbnails: GameObject[] = [];

    @SerializeField() private _loadContentsCount: number = 100;
    @SerializeField() private _contentsParent: Transform;
    @SerializeField() private _prefThumb: GameObject;
    @SerializeField() private _loopingAnimation: boolean;
    private _myCharacter: ZepetoCharacter;
    private animation: AnimationClip;
    
    Start() {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;

            // In order to take a thumbnail with my character, You need to request the content after the character is created.
            this.ContentRequest();

            Object.FindObjectOfType<ZepetoScreenTouchpad>().OnPointerDownEvent.AddListener(() => {
                this.StopGesture();
            });

            // If click the close button, cancel the gesture
            this._closeButton.onClick.AddListener(() => {
                this.StopGesture();
            });
        });
    }


    // 1. Receive content from the server
    private ContentRequest() {
        // All Type Request
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.All, contents => {
            this.contents = contents;
            for (let i = 0; i < this._loadContentsCount; i++) {
                if (!this.contents[i].IsDownloadedThumbnail) {
                    // Take a thumbnail photo using my character
                    this.contents[i].DownloadThumbnail(this._myCharacter,() =>{
                        this.CreateThumbnailObjcet(this.contents[i]);
                    });
                } else {
                    this.CreateThumbnailObjcet(this.contents[i]);
                }
            }
        });

    }

    // 2. Creating Thumbnail Objects
    private CreateThumbnailObjcet(content: Content) {
        const newThumb: GameObject = GameObject.Instantiate(this._prefThumb, this._contentsParent) as GameObject;
        newThumb.GetComponent<Thumbnail>().content = content;

        // Button Listener for each thumbnail
        newThumb.GetComponent<Button>().onClick.AddListener(() => {
            this.LoadAnimation(content);
        });
        
        this.thumbnails.push(newThumb);
    }

    // 3. Loading Animation
    private LoadAnimation(content: Content) {
        // Verify animation load
        if (!content.IsDownloadedAnimation) {
            // If the animation has not been downloaded, download it.
            content.DownloadAnimation(() => {
                // play animation clip
                this.runAnimation(this._myCharacter, content.AnimationClip)

            });    
        } else {
            this.runAnimation(this._myCharacter, content.AnimationClip)
        }
    }
    Update()
    {
        if(this._loopingAnimation == true && this._myCharacter.CurrentState === CharacterState.Idle || this._myCharacter.CurrentState === CharacterState.Invalid)
        {
            console.log("CURRENTLY LOOPING")
            this.runAnimation(this._myCharacter, null)
        }
        
        else{
            console.log("Character is nor idle nor doing any gesture")
        }
    }

    // A function to run an animation, 
    private runAnimation(character:ZepetoCharacter, animation: AnimationClip)
    {
        
        if(animation !== null)
        {
            this.animation = animation
            this._loopingAnimation = true ;
        }
        character.SetGesture(this.animation)

    }

    private StopGesture() {
        this._myCharacter.CancelGesture();
        this._loopingAnimation = false;
    }

}

/*
Need to add a logic so that the code will be able to get the state of loop and rerun the loop if needed
*/