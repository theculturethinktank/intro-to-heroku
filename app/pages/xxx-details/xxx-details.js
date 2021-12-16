import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {XxxService} from '../../services/xxx-service';

//var testVar = '';
var fromOne = 'From One';

@Page({
    templateUrl: 'build/pages/xxx-details/xxx-details.html'
    
})

export class XxxDetailsPage {
    //private fromOne = "From One" - Doesn't like calling this inside the export class

    static get parameters() {
        return [[NavController], [NavParams], [XxxService]];
    }
    
    // testing private fromOne = 'From One'

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
        //console.log(this.senderService.variableOne = this.fromOne);
        //this.router.navigate(["../../services/xxx-service"]);
        
        //console.log(this.inputName);
        //testVar = this.inputName;
        //console.log(testVar);
        
        //this.xxxService.output(this.testVar).subscribe();
        /*
    	this.xxxService.output(testVar).subscribe(() => {
            //console.log(testVar);
            return testVar;
        });
        */
    }

}
