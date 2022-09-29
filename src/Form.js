import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';                                                  //импорт всех сущностей библиотеки

const MyTextInput = ({label, ...props}) => {                                 //компонент по замене однотипных инпутов+label
    const[field, meta] = useField(props)                                     //получаем все проперти из <Formic> через Context
    //! field -это value, onChange, onBluer
    //! meta -это error, touched
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />  
            {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>) : null}             
        </>
    )
};

// const MyTextCheck = ({label, ...props}) => {                                 //компонент по замене однотипных checkbox
//     const[field, meta] = useField({...props, type: 'checkbox'})              //получаем все проперти из <Formic> и тип элемента

//     return (
//         <>
//             <label className='checkbox' >
//                 <input type="checkbox" {...props} {...field} />  
//                 {label}
//             </label>
//             {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>) : null}             
//         </>
//     )
// };

const CactomForm = () => {

    return (        
        <Formik                                                                //оборачиваем в компонент
            initialValues =  {{                                                //передаем как пропсы
                name: '',           
                email: '',
                amount: 0,            
                currency: '',
                text: '',
                terms: false,                                                  
            }}
            validationSchema = {Yup.object({                                    //если используем Yup создаем метод
                name: Yup.string()                                              //проверка по атрибуту name что это строка
                        .min(2, 'Не менее 2 символов')                          //что имеет не менее 2 символов иначе сообщение
                        .required('Обязательное поле'),                         //сообщение если не прошло валидацию
                email: Yup.string()                                             //проверка input что это строка      
                            .email('Неверный email')                            //что это email (все методы в документации)
                            .required('Обязательное поле'),
                amount: Yup.number()
                            .min(5, "Не менее 5")
                            .required('Обязательное поле'), 
                currency: Yup.string().required('Выберите валюту!'),
                text: Yup.string().min(10, 'Не менее 10 символов'),
                terms: Yup.boolean()                                           //проверка булевого значения
                            .required('Необходимо согласие')
                            .oneOf([true], 'Необходимо согласие')              //спец для булевых,если true-проходит, если нет-сообщение
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))} //выводим именно строку 
            >
            <Form className="form" >
                <h2>Отправить пожертвование</h2>
                <MyTextInput                                                   //передаем в компоненты пропсы
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label='Ваша почта'
                    id="email"
                    name="email"
                    type="email"
                />                
                <MyTextInput
                    label='Количество'
                    id="amount"
                    name="amount"
                    type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'                                                //рендерим Field в качестве атрибута selecte
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea' 
                />
                <ErrorMessage className='error' name='text' component='div'/>
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox"                          
                    />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className='error' name='terms' component='div'/>                
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CactomForm;