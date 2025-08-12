import { Cohort } from '@/types/CohortTypes';
import './CohortBlock.css'
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

type Props = {
  cohort: Cohort;
};

export default function CohortBlock({ cohort}: Props) {
    const router = useRouter();
    
    const handleClick = () => {
    router.push(`/admin/flows/${cohort.ID}`);
  };

    return (
        <div className='cohort-block' onClick={handleClick}>
            <h3 style={{ fontWeight: '700', fontSize: '18px', margin: '0'  }}>{cohort.Name}</h3>
            <h6>{`${formatDate(cohort.StartAt)} - ${formatDate(cohort.EndAt)}`}</h6>
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