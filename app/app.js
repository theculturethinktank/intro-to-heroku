import {ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {App, Platform} from 'ionic-angular';

import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {XxxListPage} from './pages/xxx-list/xxx-list';
import {YyyListPage} from './pages/yyy-list/yyy-list';

import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';
import {XxxService} from './services/xxx-service';
import * as myGlobals from './services/variable';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    queries: {
        nav: new ViewChild('content')
    },
    providers: [HTTP_PROVIDERS, PropertyService, BrokerService, XxxService]
})
class MyApp {

    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {

        this.platform = platform;

        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            {title: 'Properties', component: PropertyListPage, icon: "home"},
            {title: 'Brokers', component: BrokerListPage, icon: "people"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"},
            {title: 'XXX', component: XxxListPage, icon: "star"},
            {title: 'YYY', component: YyyListPage, icon: "star"}
        ];

        this.rootPage = WelcomePage;
        this.initializeApp();
    }

    initializeApp() {
        
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

}
