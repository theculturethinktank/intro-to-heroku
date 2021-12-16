import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import { onetwothree } from '././pages/xxx-details/xxx-details';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
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

//let testVar = '';

@Injectable()
export class XxxService {
    
    //public testVar:String = '';
    
    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
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

    yyy(xxx) {
        var randNumber = onetwothree;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/yyy', JSON.stringify({ 'xxx__c': xxx.id, 'output__c': randNumber }), {headers: headers});
    }

    unYyy(yyy) {
        return this.http.delete('/yyy/' + favorite.id);
    }
    
    output(testVar) {
        //this.service.variableOne;
        //testVar = this.testVar;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/output', JSON.stringify({ 'output__c': testVar }), {headers: headers});
    }

}
