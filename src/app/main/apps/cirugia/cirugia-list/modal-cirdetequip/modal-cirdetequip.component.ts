import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IResponseGetList } from '@core/models/response-http.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { EquipoListService } from 'app/main/apps/equipo/equipo-list/equipo-list.service';
import { IEquipo } from 'app/main/apps/equipo/models/equipo.model';
import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICirugiaDetailEquipmentPost } from '../../models/cirugia-detail-equipment';
import { CirugiaDetailEquipmentService } from '../cirugia-detail-equipment.service';

@Component({
  selector: 'app-modal-cirdetequip',
  templateUrl: './modal-cirdetequip.component.html',
  styleUrls: ['./modal-cirdetequip.component.scss'],
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
export class ModalCirdetequipComponent implements OnInit {

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

  equipmentSelect$: Observable<IResponseGetList<IEquipo>>;
  selectedEquipment: any;

  constructor(private modalService: NgbModal,
    private _cirdetequipService: CirugiaDetailEquipmentService,
    private _equipmentService: EquipoListService,
    private cdr: ChangeDetectorRef
    
    ) { 
      this._unsubscribeAll = new Subject();
      this.equipmentSelect$ = new Observable();
    }
  ngOnInit() {
    // call selects
    this.equipmentSelect$ = this._equipmentService.getEquipos();
  }

  ngOnChanges() {
    this.loadTable();
  }

  loadTable() {
    this._cirdetequipService.getCirugiaDetailByIdCirugia(this.idcirugia).subscribe(response=>{
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
    if(this.selectedEquipment==undefined){
      Swal.fire('', 'Seleccione un equipo', 'warning')
      return false
    }
    let obj: ICirugiaDetailEquipmentPost = { id_cirugia: this.idcirugia, id_equipment: this.selectedEquipment }
    this._cirdetequipService.create(obj).subscribe(
      (value)=> {
        Swal.fire('Guardado', 'Se añadió con éxito', 'success')
        this.loadTable();
      },(err)=> {
        Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
      })
  }
  deletCirugiaDetail(id:any){
    this._cirdetequipService.deleteCirugiaDetailEquipment(id).subscribe((value)=>{
      this.loadTable();
    },(err) =>{
      Swal.fire('Error', 'Ocurrió un error. Comuníquese con el administrador del sistema', 'success')
    },()=>{
      this.loadTable();
    })
  }

}
