import React from 'react';
import Dropdown from './Dropdown.jsx';
import DropdownOption from './DropdownOption.jsx';


const rentalFiltersData = 
[{ name: "Show All",  id: "1" },
{ name: "Rigs Only", id: "2" },
{ name: "Canopies Only", id: "3" },
{ name: "Containers Only", id: "4" },];
//the filters will probably end up different
const itemFiltersData =             
[{ name: "Show All",  id: "1" },
{ name: "Rigs Only", id: "2" },
{ name: "Canopies Only", id: "3" },
{ name: "Containers Only", id: "4" },
{ name: "AADs Only", id: "5"}];

const defaultFiltersData = rentalFiltersData

//a class to call the dropdowns of any filter we may need
//based on the "id" required in Dropdown we can provide different FilterOptionData
export default class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.props.onChange.bind(this);
        this.state = {
        }
    }

    getFilterOptions() {
        var options = [];
        var choice;
        switch (this.props.id) {
            case "RentalFilterDropdown":
            choice = rentalFiltersData;
            break;
            case "InventoryFilterDropdown":
            choice = itemFiltersData;
            break;
            default:
            choice = defaultFiltersData;
            break;
        }        

        Object.keys(choice).forEach(function (i) {
            var nextOption = <DropdownOption
                key={i}
                optionText={choice[i].name} />
            options.push(nextOption);
        });
        return options;
    }

    
    render() {
        var Filtered = this.getFilterOptions();
        return (
            <div>                
                <Dropdown 
                onChange={this.props.onChange}  
                labelText={this.props.labelText} 
                id={this.props.id}>
                    {Filtered}
                </Dropdown>                
            </div>
        );
    }
}