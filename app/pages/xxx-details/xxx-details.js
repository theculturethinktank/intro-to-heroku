import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {XxxService} from '../../services/xxx-service';

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
    
    submitOutput() {
    	console.log(this.inputName);
    	
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/output', JSON.stringify({ 'output__c': this.inputName }), {headers: headers});
    }

}
