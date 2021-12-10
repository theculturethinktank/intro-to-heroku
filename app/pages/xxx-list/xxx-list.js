import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {XxxDetailsPage} from '../xxx-details/xxx-details';
import {XxxService} from '../../services/xxx-service';

@Page({
    templateUrl: 'build/pages/xxx-list/xxx-list.html'
})
export class XxxListPage {

    static get parameters() {
        return [[NavController], [XxxService]];
    }

    constructor(nav, xxxService) {
        this.nav = nav;
        this.xxxService = xxxService;
    }

    ngOnInit() {
        this.xxxService.findAll().subscribe(xxxs => this.xxxs = xxxs);
    }

    itemTapped(event, xxx) {
        this.nav.push(XxxDetailsPage, {
            xxx: xxx
        });
    }

}
