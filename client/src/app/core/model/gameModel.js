
export class GameModel {

	constructor() {

        this.isMobile = false;
        this.vrEnabled = false;
    };

    getIsMobile(){
        return this.isMobile;
    };

    setIsMobile(value){
        this.isMobile = value;
    };

    getVrEnabled(){
        return this.vrEnabled;
    };

    setVrEnabled(value){
        if(value === undefined)this.vrEnabled = !this.vrEnabled;
            else this.vrEnabled = value;
    };

}