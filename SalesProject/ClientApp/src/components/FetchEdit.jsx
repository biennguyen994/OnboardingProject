import React, { Component } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class FetchEdit extends Component {
    static displayName = FetchEdit.name;
    constructor(props) {
        super(props);
        this.state = { salesList: [], custList: [], proList: [], storeList: [], sid: null, loading: true, cid: '', pid: '', sid: '', ndate: '' };
        this.loadData = this.loadData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
        this.refreshList();
    }

    refreshList() {
        const $ = window.$;
        $.ajax({
            url: "api/Customers/GetCustomer",
            type: "GET",
            success: function (data) { this.setState({ custList: data }) }.bind(this)
        });

        $.ajax({
            url: "api/Products/GetProduct",
            type: "GET",
            success: function (data) {
                this.setState({
                    proList: data,
                    loading: false
                })
            }.bind(this)
        });

        $.ajax({
            url: "api/Stores/GetStore",
            type: "GET",
            success: function (data) {
                this.setState({
                    storeList: data,
                    loading: false
                })
            }.bind(this)
        });
    };

    loadData() {
        const $ = window.$;
        $.ajax({
            url: "api/Sales/GetSales",
            type: "GET",
            success: function (data) {
                this.setState({ salesList: data, loading: false })
            }.bind(this),
        });

    }

    handleCustomerChange(e) {
        this.setState({
            cid: e.target.value
            })
    }

    handleProductChange(e) {
        this.setState({
            pid: e.target.value
            })
    }

    handleDateChange(date) {
        this.setState({
            ndate: date
        })
    }

    handleStoreChange(e) {
        this.setState({
            sid:  e.target.value
            })  
    }

    onSubmit(e) {
        let data = {id: 10, customerId: this.state.cid, productId: this.state.pid, storeId: this.state.sid, dateSold: this.state.ndate }
        const $ = window.$;
        $.ajax({
            url: "api/Sales/EditSales",
            type: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function (data) {
                this.setState({
                    open2: false,
                    cid: '',
                    pid: '',
                    sid: '',
                    ndate: ''
                })
                this.loadData();
            }.bind(this)
        });
    }

    render() {
        let cList = this.state.custList;
        let pList = this.state.proList;
        let sList = this.state.storeList;
        return (
            <React.Fragment>
                                <Form>
                                    <Form.Field>
                        <label>Date Sold</label>
                        <DatePicker selected={this.state.ndate} dateFormat="dd-MM-yyyy" onChange={this.handleDateChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Customer</label>
                                        <select class="ui dropdown" name="Customer" onChange={this.handleCustomerChange}>
                                            {cList.map(c => (
                                                <option key={c.id} value={c.id}  >
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Product</label>
                                        <select class="ui dropdown" name="Product" onChange={this.handleProductChange}>
                                            {pList.map(p => (
                                                <option key={p.id} value={p.id}  >
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Store</label>
                                        <select class="ui dropdown" name="Store" onChange={this.handleStoreChange}>
                                            {sList.map(s => (
                                                <option key={s.id} value={s.id}  >
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Form.Field>
                                 </Form>
                <Button positive icon='checkmark' labelPosition='right' onClick={this.onSubmit} content='Create' />
            </React.Fragment>
        )
    }
}
