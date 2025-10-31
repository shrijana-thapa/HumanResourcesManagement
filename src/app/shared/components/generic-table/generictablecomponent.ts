import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material-module/material-module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generictablecomponent',
  standalone: true,
  templateUrl: './generictablecomponent.html',
  styleUrls: ['./generictablecomponent.scss'],
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class GenericTableComponent implements AfterViewInit, OnInit {
  @Input() tableHeading: { key: string; label: string }[] = [];
  @Input() tableData: any[] = [];
  @Input() showActions: boolean = false;
  @Input() actions: { type: string; label: string }[] = [];
  @Output() actionClicked = new EventEmitter<{ action: string; data: any }>();
  @Input() enablePagination = false;
  @Input() enableSorting = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.tableHeading.map((col) => col.key);
    if (this.showActions) this.displayedColumns.push('actions');
    console.log('tableData', this.tableData);
  }
  ngAfterViewInit() {
    if (this.enablePagination && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.enableSorting && this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      const newData = changes['tableData'].currentValue || [];
      console.log(' TableData arrived in generic:', newData);
      this.dataSource.data = [...newData];
    }
  }
  onActionClicked(action: string, data: any, event?: Event) {
    if (event) event.stopPropagation(); //prevent row click
    this.actionClicked.emit({ action, data });
  }
}
