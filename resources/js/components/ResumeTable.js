
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

export class ResumeTable extends Component {

    constructor() {
        super();
        this.state = {
            displayDialog: false,
            selectedItem: {id:'', name:'', surname:'', experience_years:'', date_of_birth:''},
            vacancies: {}
        };
    }

    componentDidMount(){
        axios.get('/api/resumes')
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch(function (error) {
             //  console.log(error);
            })
    }
    rowClick(e){
        axios.get('/api/resumes/'+e.value.id)
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
                                title="Resumes"
                                category="List of resumes"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <DataTable ref={(el) => this.dt = el} value={this.state.items} paginator={true} rows={10} header={header} resizableColumns={true}
                                               globalFilter={this.state.globalFilter} emptyMessage="No records found" responsive={true} dataKey="id"
                                               selectionMode="single"
                                               selection={this.state.selectedItem}
                                               onSelectionChange={(e) => this.rowClick(e)}
                                    >
                                        <Column field="id"                  header="id"               sortable={true}   style={{width:'5%', textAlign: 'center'}} excludeGlobalFilter={true}  />
                                        <Column field="name"                header="name"             sortable={true} filter={true} filterPlaceholder="name" filterMatchMode="contains"  />
                                        <Column field="surname"             header="surname"          sortable={true} filter={true} filterPlaceholder="surname" filterMatchMode="contains"  />
                                        <Column field="date_of_birth"       header="date_of_birth"    sortable={true} filter={true} filterPlaceholder="date_of_birth" filterMatchMode="contains" style={{width:'10%', textAlign: 'center'}}/>
                                        <Column field="experience_years"    header="experience_years" sortable={true} filter={true} filterPlaceholder="experience_years" filterMatchMode="contains" style={{ textAlign: 'center'}}/>
                                        <Column field="works"               header="works"            sortable={true} filter={true} filterPlaceholder="works" filterMatchMode="contains" />
                                    </DataTable>
                                }
                            />
                        </Col>
                    </Row>

                    <Dialog header="Vacancies" visible={this.state.displayDialog} style={{width: '50vw'}} onHide={() => this.onHide('displayDialog')} >
                        <div className="content">
                            <Container fluid>
                                <Row>
                                    <Panel header="Resume">
                                        <div className="p-grid">
                                            <div className="p-col">ID: {this.state.selectedItem.id}</div>
                                            <div className="p-col">Name: {this.state.selectedItem.name}</div>
                                            <div className="p-col">Surname: {this.state.selectedItem.surname}</div>
                                            <div className="p-col">date_of_birth: {this.state.selectedItem.date_of_birth}</div>
                                            <div className="p-col">experience_years: {this.state.selectedItem.experience_years}</div>
                                        </div>
                                    </Panel>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Card
                                            title="Vacancies for selected resume"
                                            category="List of vacancies for seleted resume"
                                            ctTableFullWidth
                                            ctTableResponsive
                                            content={
                                                <DataTable  value={this.state.vacancies} paginator={true} rows={10} header={header} resizableColumns={true}
                                                          emptyMessage="No vacancy found" responsive={true}>
                                                    <Column field="id"                  header="id"               sortable={true}   />
                                                    <Column field="name"                header="name"             sortable={true}/>
                                                    <Column field="experience_years"    header="experience_years" sortable={true} style={{ textAlign: 'center'}}/>
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
export default ResumeTable;
