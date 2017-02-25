SCRIPTS="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for dir in `ls $SCRIPTS/../packages`;
do
  cd $SCRIPTS/../packages/$dir && $SCRIPTS/../node_modules/.bin/ncu -a -u
done
