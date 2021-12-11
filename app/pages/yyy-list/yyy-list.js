import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {XxxDetailsPage} from '../xxx-details/xxx-details';
import {XxxService} from '../../services/xxx-service';

@Page({
    templateUrl: 'build/pages/yyy-list/yyy-list.html'
})
export class YyyListPage {

    static get parameters() {
        return [[NavController], [XxxService]];
    }

    constructor(nav, xxxService) {
        this.nav = nav;
        this.xxxService = xxxService;
    }

    ngOnInit() {
        this.loadYyy();
    }

    loadYyy() {
        this.xxxService.getYyy().subscribe(yyys => this.yyys = yyys);
    }

    itemTapped(event, yyy) {
        this.nav.push(XxxDetailsPage, {
            xxx: yyy.xxx
        });
    }

    deleteItem(event, yyy) {
        this.xxxService.unYyy(yyy).subscribe(() => this.loadYyy());
    }

}
