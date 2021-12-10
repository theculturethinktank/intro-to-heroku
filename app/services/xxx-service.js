import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyXxx = (xxx) => {
    return {
        id: xxx.sfid,
        title: xxx.title__c,
        name: xxx.name,
    };
};

let prettifyYyy = (yyy) => {
    return {
        id: yyy.sfid,
        title: yyy.title__c,
        xxx: prettifyXxx(yyy)
    };
};

@Injectable()
export class XxxService {

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
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/yyy', JSON.stringify({ 'xxx__c': xxx.id }), {headers: headers});
    }

    unYyy(yyy) {
        return this.http.delete('/yyy/' + favorite.id);
    }

}