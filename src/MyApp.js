import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { addUser, getUser, updateUser, deleteUser } from './actions/sessions';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';

import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';

import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

import Headline from 'grommet/components/Headline';

import Edit from 'grommet/components/icons/base/Edit';
import Trash from 'grommet/components/icons/base/Trash';

class MyApp extends Component {

  constructor(){
    super();
    this.state={ btnType: 'Add', EmpDetails: { id: '', name: '', exp: '' } };
    this.onEmpIdChange = this.onEmpIdChange.bind(this);
    this.onEmpNameChange = this.onEmpNameChange.bind(this);
    this.onEmpExpChange = this.onEmpExpChange.bind(this);
    this.Submit = this.Submit.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.Update = this.Update.bind(this);  
    this.Cancel = this.Cancel.bind(this);    
  }

  componentWillReceiveProps(nextProps, nextState){
    if(nextProps.EditEmp !== '' && nextProps.EditEmp.id !== this.props.EditEmp.id ){
        this.setState({EmpDetails: nextProps.EditEmp });
    }
  }

  onEmpIdChange(e){
    var obj = this.state.EmpDetails;
    obj.id = e.target.value;
    this.setState({EmpDetails: obj})
  }

  onEmpNameChange(e){
    var obj = this.state.EmpDetails;
    obj.name = e.target.value;
    this.setState({EmpDetails: obj})
  }
  
  onEmpExpChange(e){
    var obj = this.state.EmpDetails;
    obj.exp = e.target.value;
    this.setState({EmpDetails: obj})
  }

  Submit(){
    this.props.onAddUser(this.state.EmpDetails);
    this.setState({EmpDetails: {id: '', name: '', exp: '' } })
  }

  edit(id){
    var selEmp = '';    
    // this.props.Employees.filter( (emp,idx) => {
    //     if(emp.id === id){
    //       selEmp = emp;
    //     }
    // });
    this.props.onGetUser(id);
    this.setState({ btnType: 'Update' });
    // this.setState({ EmpDetails: selEmp, btnType: 'Update' });
  }

  Update(id){
    this.props.onUpdateUser(this.state.EmpDetails);
    this.setState({ btnType: 'Add', EmpDetails: { id: '', name: '', exp: '' } });
  }

  Cancel(){
    this.setState({ btnType: 'Add', EmpDetails: { id: '', name: '', exp: '' } });
  }

  delete(id){
    this.props.onDeleteUser(id);
  }

  render() {

    var Emplist = '';

    var Emplist = this.props.Employees.map( (emp, index)=> {
        return <TableRow>
                  <td> {emp.id} </td>
                  <td> {emp.name} </td>
                  <td> {emp.exp} </td>
                  <td> <Edit size='small' onClick={ () =>  this.edit(emp.id) } /> </td>
                  <td> <Trash size='small' onClick={ () => this.delete(emp.id) } /> </td>
               </TableRow>
    })

    return (
    <App centered={false}>
         <Header colorIndex="neutral-1" className="HeaderPart" fixed={false} style={{width:'100% !import',borderBottom: '1px solid rgb(66, 85, 99)'}}>   
                <Box pad="none" margin="none" direction="row" style={{width:'100%'}}>   
                    <Box basis="3/4" pad="small">
                      <Headline align="start" margin="small" size="small" strong={true}>
                          Learn  Redux
                      </Headline>
                    </Box>
                </Box>      
         </Header>

        <Box align='center' margin='none' pad='none' >
            <Form>
              <Header>
                <Heading>
                  Employee Details
                </Heading>
              </Header>
              <FormFields>
                <FormField label='Employee ID'>
                  <TextInput value={this.state.EmpDetails.id} onDOMChange={this.onEmpIdChange} />
                </FormField>
                <FormField label='Employee Name'>
                  <TextInput value={this.state.EmpDetails.name} onDOMChange={this.onEmpNameChange}/>
                </FormField>
                <FormField label='Years of Experience'>
                  <TextInput value={this.state.EmpDetails.exp} onDOMChange={this.onEmpExpChange}/>
                </FormField>
              </FormFields>
              <Footer pad={{"vertical": "medium"}}>
                {this.state.btnType === 'Add' ? 
                  <Button label='Submit'
                  primary={true}
                  onClick={this.Submit} />
                :
                  <Box direction='row' margin='none' pad={{between: 'small'}} >
                    <Button label='Update'
                    primary={true}
                    onClick={this.Update} />
                    <Button label='Cancel'
                    critical={true}
                    onClick={this.Cancel} />
                  </Box>
                }
                  
              </Footer>
            </Form>
        </Box>
        
        <Box align='center' margin='none' pad='none' >
          <Header>
                <Heading>
                  Employees List
                </Heading>
          </Header>
          <Table>
            <TableHeader labels={['ID', 'Employee Name', 'Experience']} />
            { Emplist }
          </Table>
        </Box>

    </App>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      Employees: state.Employees.Employees,
      EditEmp: state.Employees.EditEmp
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      onAddUser: (userData) =>
      {              
          dispatch(addUser(userData));
      },
      onGetUser: (userData) =>
      {              
          dispatch(getUser(userData));
      },
       onUpdateUser: (userData) =>
      {              
          dispatch(updateUser(userData));
      },      
       onDeleteUser: (userid) =>
      {              
          dispatch(deleteUser(userid));
      }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyApp);
