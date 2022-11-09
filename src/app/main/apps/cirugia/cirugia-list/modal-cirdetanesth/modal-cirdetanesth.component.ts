import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IResponseGetList } from '@core/models/response-http.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AnesthesiaListService } from 'app/main/apps/anesthesia/anesthesia-list/anesthesia-list.service';
import { IAnesthesia } from 'app/main/apps/anesthesia/models/anesthesia.model';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ICirugiaDetailAnesthesiaPost } from '../../models/cirugia-detail-anesthesia';
import { CirugiaDetailAnesthesiaService } from '../cirugia-detail-anesthesia.service';

@Component({
  selector: 'app-modal-cirdetanesth',
  templateUrl: './modal-cirdetanesth.component.html',
  styleUrls: ['./modal-cirdetanesth.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
			.dark-modal .modal-content {
				background-color: #292b2c;
				color: white;
			}
			.dark-modal .close {
				color: white;
			}
			.light-blue-backdrop {
				background-color: #5cb3fd;
			}
		`,
  ],
})
export class ModalCirdetanesthComponent implements OnInit {

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() idcirugia: number;

  closeResult: string;

  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";

  private _unsubscribeAll: Subject<any>;

  anesthesiaSelect$: Observable<IResponseGetList<IAnesthesia>>;
  selectedAnesthesia: any;

  constructor(private modalService: NgbModal,
    private _cirdetanesthService: CirugiaDetailAnesthesiaService,
    private _anesthesiaService: AnesthesiaListService,
    private cdr: ChangeDetectorRef
    
    ) { 
      this._unsubscribeAll = new Subject();
      this.anesthesiaSelect$ = new Observable();
    }
  ngOnInit() {
    // call selects
    this.anesthesiaSelect$ = this._anesthesiaService.getAnesthesias();
  }

  ngOnChanges() {
    this.loadTable();
  }

  loadTable() {
    this._cirdetanesthService.getCirugiaDetailByIdCirugia(this.idcirugia).subscribe(response=>{
      this.rows = response.data
      this.temp = this.rows
    })
    
  }

  openXl(content) {
    this.loadTable();
    this.modalService.open(content, { size: 'xl' });
  }

  selectDiagnostico(row: any) {
  }

  selectDetailChange(model: any) {
  }

  saveDetail() {
    if(this.selectedAnesthesia==undefined){
      Swal.fire('', 'Seleccione una anestesia', 'warning')
      return false
    }
    let obj: ICirugiaDetailAnesthesiaPost = { id_cirugia: this.idcirugia, id_anesthesia: this.selectedAnesthesia }
    this._cirdetanesthService.create(obj).subscribe(
      (value)=> {
        Swal.fire('Guardado', 'Se añadió con éxito', 'success')
        this.loadTable();
      },(err)=> {
        Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
      })
  }
  deletCirugiaDetail(id:any){
    this._cirdetanesthService.deleteCirugiaDetailAnesthesia(id).subscribe((value)=>{
      this.loadTable();
    },(err) =>{
      Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
    },()=>{
      this.loadTable();
    })
  }


}
