import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

let prettifyXxx = (xxx) => {
    let prettyXxx = {
        id: xxx.sfid,
        title: xxx.title__c,
        unique: xxx.unique__c,
        name: xxx.name,
        output: xxx.output__c
    };
    return prettyXxx;
};

let prettifyYyy = (yyy) => {
    return {
        id: yyy.yyy__c_sfid,
        title: yyy.title__c,
        unique: yyy.unique__c,
        output: yyy.output__c,
        xxx: prettifyXxx(yyy)
    };
};

@Page({
    templateUrl: 'build/proto/proto-details.html'
})
export class ProtoPage {

    static get parameters() {
        return [[Http], [NavController]];
    }

    constructor(nav, http) {
        this.nav = nav;
        this.http = http;
    }

    ngOnInit() {
        // do I need this?
    }
  
    findAll() {
        return this.http.get('/xxx').map(response => response.json().map(prettifyXxx));
    }

    findById(id) {
        return this.http.get('/xxx/' + id).map(response => prettifyXxx(response.json()));
    }

    getYyy() {
        return this.http.get('/yyy').map(response => response.json().map(prettifyYyy));
    }

    submitOutput() {
        console.log(this.inputName);
        var randNumber = this.inputName;
        console.log(randNumber)'
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/output', JSON.stringify({ 'output__c': randNumber }), {headers: headers});
    }

}
