import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {XxxService} from '../../services/xxx-service';

/*var testVar = '';*/

@Page({
    templateUrl: 'build/pages/xxx-details/xxx-details.html'
    
})

export class XxxDetailsPage {
    

    static get parameters() {
        return [[NavController], [NavParams], [XxxService]];
    }

    constructor(nav, navParams, xxxService) {
        this.nav = nav;
        this.xxxService = xxxService;
        this.xxx = navParams.get('xxx');
    }

    ngOnInit() {
        this.xxxService.findById(this.xxx.id).subscribe(xxx => this.xxx = xxx);
    }

    yyy(event, xxx) {

        this.xxxService.yyy(xxx).subscribe(() => {
            let alert = Alert.create({
                title: 'YYY',
                subTitle: 'XXX added to your YYY',
                buttons: ['OK']
            });
            this.nav.present(alert);
        });

    }
    
    

    submitOutput(inputName) {
        //console.log(this.inputName);
        testVar = this.inputName;
        console.log(testVar);
        
        //this.xxxService.output(this.testVar).subscribe();
        /*
    	this.xxxService.output(testVar).subscribe(() => {
            //console.log(testVar);
            return testVar;
        */
        });
        
    }

}
