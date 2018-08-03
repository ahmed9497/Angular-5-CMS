import {Component, enableProdMode, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {Inspeccion} from "./inspeccion.model";
import {AngularFirestore} from "angularfire2/firestore";
import * as moment from 'moment';
import { ClassGetter } from '../../../../node_modules/@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-membership',
    templateUrl: './inspeccion.component.html',
    styleUrls: ['./inspeccion.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InspeccionComponent implements OnInit {
    dataSourceEquip: Inspeccion[] = [];
    events: Array<string> = [];
    equipment: string = 'Inspeccion';
    inspections: string = 'Inspeccion';
    public itemsEquip: Observable<any[]>;
    public displayMonths = 2;
    public navigation = 'select';
    modelPopup;
    lastVisible: any;
    lastVisible2: any;

    constructor(private db: AngularFirestore) {
        // this.dataSourceEquip = service.getEmployees();
        // this.states = service.getStates();
        this.itemsEquip = db.collection(this.equipment, ref => ref.limit(50)
            .orderBy('DeliveryDate', 'desc'))
            .snapshotChanges();
           // console.log(this.itemsEquip);
            this.getEquipItems();
    }

    ngOnInit() {
       // this.check();
        
    }

    onDateSelect(e) {
        // console.log(e);
        // let selectedDate = moment().year(e.year).month(e.month - 1).date(e.day).format("MM-DD-YYYY");
        // console.log(selectedDate);
        // this.itemsEquip = this.db.collection(this.equipment, ref =>
        //     ref.where( 'DeliveryDate', '==', selectedDate))
        //     .snapshotChanges();
        // this.getEquipItems();
    }

    selectedDate(d) {
        console.log(this.modelPopup);
        // console.log(d);
        // let date2 = new Date();
        // date2.setFullYear(this.modelPopup.year, this.modelPopup.month, this.modelPopup.day);
        // console.log(date2);
        // console.log(date2.toString());
        console.log(this.lastVisible);
        let selectedDate = this.modelPopup.year + '-' + this.modelPopup.month + '-' + this.modelPopup.day;
        console.log(this.selectedDate);
        // this.itemsEquip = this.db.collection(this.equipment, ref =>
        //     ref.orderBy('CreationDate', 'desc')
        //         .where( 'CreationDate', '==', selectedDate)
        //         .limit(50))
        //     .snapshotChanges();
        // this.getEquipItems();
    }

    getEquipItems() {
        this.itemsEquip.subscribe(
            actions => {
               
                if(actions.length > 0) {
                    this.dataSourceEquip = [];
                    let lastDate = null;
                    let lastAction = actions[actions.length - 1];
                    this.lastVisible = lastAction.payload.doc.data();
                   
                    this.lastVisible2 = lastAction.payload.doc;
                   // console.log(this.lastVisible);
                    actions.map(a => {
                        const id = a.payload.doc.id;
                        const item = a.payload.doc.data();
                        let equipment: Inspeccion = new Inspeccion;
                        equipment.ID = id;
                        equipment.ContactEmail = item.ContactEmail;                        
                        equipment.ContactName = item.ContactName;
                        equipment.ContactPhone = item.ContactPhone;
                        equipment.CustomerName = item.CustomerName;
                        equipment.DeliveryDate = item.DeliveryDate;
                        equipment.DocumentType = item.DocumentType;                        
                        equipment.Project = item.Project;
                        equipment.ProjectId = item.ProjectId;
                        equipment.Status = item.Status;                        
                        equipment.SupervisorName = item.SupervisorName;
                        equipment.TimeStamp = item.TimeStamp;
                        
                       
                       // equipment.DeliveryAddress = item.DeliveryAddress;
                        
                        
                        
                       
                        //equipment.SupervisorId = item.SupervisorId;
                        
                       // console.log(equipment.CustomerName);
                        this.dataSourceEquip.push(equipment);
                        lastDate = item.CreationDate;
                       // console.log(id);
                       // console.log(this.dataSourceEquip);
                    });
                }
            }
        );
    }

    customerData(name) {
        console.log(name);
    }

    onNext() {
        this.itemsEquip = this.db.collection(this.equipment, ref =>
            ref.orderBy('DeliveryDate', 'desc')
               .startAfter(this.lastVisible2)
               .limit(50))
               .snapshotChanges();
        this.getEquipItems();
    }

    logEvent(eventName, event) {
        this.events.unshift(eventName);
    }

    updateItem(data) {
        let dataGrid = data.data;
        let dataDoc = {};
        for (var key in dataGrid) {
            if (dataGrid.hasOwnProperty(key)) {
                dataDoc[key] = dataGrid[key];
            }
        }
        // let collection = (grid === 'insp') ? this.inspections : this.equipment;
        let collection = this.equipment;
        this.db.collection(collection).doc("/" + data.key).update(dataDoc)
            .then(data => {
                console.log('done');
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    addItem(event) {
        let collection = this.equipment;
        this.db.collection(collection).add(event.data)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    toDeleteItem(event) {
        let collection = this.equipment;
        this.db.collection("/Inspeccion").doc(event.key).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

    clearEvents() {
        this.events = [];
    }
 
    // check(){
    //     this.db.collection('/Inspeccion').snapshotChanges().subscribe(
    //         items=>{
    //             console.log(items);
    //             console.log(this.dataSourceEquip);
    //         }
    //     );
    // }

}
