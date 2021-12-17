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

    submitOutput(event, xxx) {
        
        this.xxxService.output(xxx, this.inputName).subscribe((result) => {
            console.log(result);
            // todo where to send the user
            let alert = Alert.create({
                title: 'User Input',
                subTitle: this.inputName + ' was added to your YYY',
                buttons: ['OK']
            });
            this.nav.present(alert);
        });
    }

}
