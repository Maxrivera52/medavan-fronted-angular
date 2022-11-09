import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IResponseGetList } from '@core/models/response-http.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ISpecialty } from 'app/main/apps/specialty/models/specialty.model';
import { SpecialtyListService } from 'app/main/apps/specialty/specialty-list/specialty-list.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IDiagnosticoDetailSpecialtyPost } from '../../models/diagnostics-detail-specialtys.model';
import { DiagnosticDetailSpecialtyListService } from '../diagnostico-detail-specialty.service';

@Component({
  selector: 'app-modal-servdetspec',
  templateUrl: './modal-servdetspec.component.html',
  styleUrls: ['./modal-servdetspec.component.scss'],
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
export class ModalServdetspecComponent implements OnInit, OnChanges {
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() iddiagnostico: number;

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

  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;
  selectedSpecialty: any;

  constructor(private modalService: NgbModal,
    private _diagdetspecService: DiagnosticDetailSpecialtyListService,
    private _specialtyService: SpecialtyListService,
    private cdr: ChangeDetectorRef
    
    ) { 
      this._unsubscribeAll = new Subject();
      this.specialtySelect$ = new Observable();
    }
  ngOnInit() {
    // call selects
    this.specialtySelect$ = this._specialtyService.getSpecialtys();
  }

  ngOnChanges() {
    this.loadTable();
  }

  loadTable() {
    this._diagdetspecService.getDiagnosticosDetailByIdDiagnostic(this.iddiagnostico).subscribe(response=>{
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

  specialtyChange(model: any) {
  }

  saveDetail() {
    if(this.selectedSpecialty==undefined){
      Swal.fire('', 'Seleccione un especialidad', 'warning')
      return false
    }
    let obj: IDiagnosticoDetailSpecialtyPost = { id_diagnostic: this.iddiagnostico, id_specialty: this.selectedSpecialty }
    this._diagdetspecService.create(obj).subscribe(
      (value)=> {
        Swal.fire('Guardado', 'Se añadió con éxito', 'success')
        this.loadTable();
      },(err)=> {
        Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
      })
  }
  deletDiagnosticoDetail(id:any){
    this._diagdetspecService.deleteDiagnosticDetailSpecialty(id).subscribe((value)=>{
      this.loadTable();
    },(err) =>{
      Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
    },()=>{
      this.loadTable();
    })
  }

}
