import { Cohort } from '@/types/CohortTypes';
import './CohortBlock.css'

type Props = {
  cohort: Cohort;
};

export default function CohortBlock({ cohort}: Props) {
    return (
        <div className='cohort-block'>
            <h3>{cohort.Name}</h3>
            <h6>{`${cohort.StartAt} - ${cohort.EndAt}`}</h6>
            <hr />
            <div className='amount-table'>
                <div className='amount-stat'>
                    <h4>Психологи</h4>
                    <h4 style={{ fontWeight: '700'}}>{cohort.AmountOfPsychologists}</h4>
                </div>
                <div className='amount-stat'>
                    <h4>Клиенты</h4>
                    <h4 style={{ fontWeight: '700'}}>{cohort.AmountOfClients}</h4>
                </div>
                <div className='amount-stat'>
                    <h4>Замены</h4>
                    <h4 style={{ fontWeight: '700'}}>{cohort.AmountOfReplacements}</h4>
                </div>
                <div className='amount-stat'>
                    <h4>Жалобы</h4>
                    <h4 style={{ fontWeight: '700'}}>{cohort.AmountOfComplaints}</h4>
                </div>
            </div>
        </div>
    )
}