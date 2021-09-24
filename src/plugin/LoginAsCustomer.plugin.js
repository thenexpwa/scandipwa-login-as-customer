/**
 *
 * @package     nexpwa/login-as-customer
 * @author      Jayanka Ghosh <Codilar Technologies>
 * @license     https://opensource.org/licenses/OSL-3.0 Open Software License v>
 * @link        http://www.codilar.com/
 */
const MyAccountQuery = {
    _getCustomerFields: (args, callback) => [
        ...callback(...args),
        'allow_remote_shopping_assistance'
    ]
};

const MyAccountCustomerTable = {
    dataPairArray: (result, instance) => {
        const { customer: { allow_remote_shopping_assistance } } = instance.props;

        const source = {
            allow_remote_shopping_assistance: allow_remote_shopping_assistance ? __('Yes') : __('No')
        };

        return [
            ...result,
            {
                key: 'allow_remote_shopping_assistance',
                label: __('Allow Remote Shopping Assistance'),
                source
            }
        ];
    }
};

const MyAccountCustomerFormPlugin = {
    fieldMap: (result, instance) => {
        const { customer: { allow_remote_shopping_assistance = false } } = instance.props;
        const { isAllowRemoteShoppingAssistanceChecked = allow_remote_shopping_assistance } = instance.state || {};
        return {
            ...result,
            allow_remote_shopping_assistance: {
                label: __('Allow Remote Shopping Assistance'),
                validation: ['notEmpty'],
                type: 'checkbox',
                checked: isAllowRemoteShoppingAssistanceChecked,
                onChange: () => {
                    instance.setState({
                        isAllowRemoteShoppingAssistanceChecked: !isAllowRemoteShoppingAssistanceChecked
                    });
                }
            }
        };
    }
};

export const config = {
    'Query/MyAccount': {
        'member-function': {
            _getCustomerFields: MyAccountQuery._getCustomerFields
        }
    },
    'Component/MyAccountCustomerTable/Component': {
        'member-function': {
            dataPairArray: MyAccountCustomerTable.dataPairArray
        }
    },
    'Component/MyAccountCustomerForm/Component': {
        'member-function': {
            fieldMap: MyAccountCustomerFormPlugin.fieldMap
        }
    }
};

export default config;
