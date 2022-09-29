import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';                                                  //импорт всех сущностей библиотеки

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
            <form className="form" >
                <h2>Отправить пожертвование</h2>
                <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className='error' name='name' component='div'/> 

                <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className='error' name='email' component='div'/>  

                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className='error' name='amount' component='div'/> 
                
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
            </form>
        </Formik>
    )
}

export default CactomForm;