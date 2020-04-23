
import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';

import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import {Dialog} from 'primereact/dialog';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Panel} from "primereact/panel";

export class VacancyTable extends Component {

    constructor() {
        super();
        this.state = {
            displayDialog: false,
            selectedItem: {id:'', name:'', experience_years:'', works:''},
            vacancies: {}
        };
    }

    componentDidMount(){
        axios.get('/api/vacancies')
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch(function (error) {
               // console.log(error);
            })
    }
    rowClick(e){
        axios.get('/api/vacancies/'+e.value.id)
            .then(response => {
                this.setState({ vacancies: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({displayDialog: true,
            selectedItem: e.value
        });
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {
        const header = (
            <div style={{'textAlign':'left'}}>
                <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
            </div>
        );

        return (
            <div className="content">

                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Vacancies"
                                category="List of vacancies"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <DataTable ref={(el) => this.dt = el} value={this.state.items} paginator={true} rows={10} header={header} resizableColumns={true}
                                               globalFilter={this.state.globalFilter} emptyMessage="No records found" responsive={true} dataKey="id"
                                               selectionMode="single"
                                               selection={this.state.selectedItem}
                                               onSelectionChange={(e) => this.rowClick(e)}
                                    >
                                        <Column field="id"                  header="id"               sortable={true}   style={{width:'5%', textAlign: 'center'}} excludeGlobalFilter={true} />
                                        <Column field="name"                header="name"             sortable={true} filter={true} filterPlaceholder="name" filterMatchMode="contains"  />
                                        <Column field="experience_years"    header="experience_years" sortable={true} filter={true} filterPlaceholder="experience_years" filterMatchMode="contains" style={{ textAlign: 'center'}}/>
                                        <Column field="works"               header="works"            sortable={true} filter={true} filterPlaceholder="works" filterMatchMode="contains" />
                                    </DataTable>
                                }
                            />
                        </Col>
                    </Row>

                    <Dialog header="Vacancy" visible={this.state.displayDialog} style={{width: '50vw'}} onHide={() => this.onHide('displayDialog')} >
                        <div className="content">
                            <Container fluid>
                                <Row>
                                    <Panel header="Vacancy">
                                        <div className="p-grid">
                                            <div className="p-col">ID: {this.state.selectedItem.id}</div>
                                            <div className="p-col">Name: {this.state.selectedItem.name}</div>
                                            <div className="p-col">experience_years: {this.state.selectedItem.experience_years}</div>
                                            <div className="p-col">works: {this.state.selectedItem.works}</div>
                                        </div>
                                    </Panel>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Card
                                            title="Resumes for selected vacancy"
                                            category="List of resumes for selected vacancy"
                                            ctTableFullWidth
                                            ctTableResponsive
                                            content={
                                                <DataTable  value={this.state.vacancies} paginator={true} rows={10} header={header} resizableColumns={true}
                                                            emptyMessage="No vacancy found" responsive={true}>
                                                    <Column field="id"                  header="id"               sortable={true}   style={{width:'5%', textAlign: 'center'}} excludeGlobalFilter={true}  />
                                                    <Column field="name"                header="name"             sortable={true}   />
                                                    <Column field="surname"             header="surname"          sortable={true}   />
                                                    <Column field="date_of_birth"       header="date_of_birth"    sortable={true}  style={{width:'10%', textAlign: 'center'}}/>
                                                    <Column field="experience_years"    header="experience_years" sortable={true}  style={{ textAlign: 'center'}}/>
                                                    <Column field="works"               header="works"            sortable={true}  />
                                                </DataTable>
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Dialog>
                </Container>
            </div>
        );
    }
}
export default VacancyTable;
