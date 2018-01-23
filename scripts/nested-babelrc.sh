SCRIPTS="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for dir in `ls $SCRIPTS/../packages`;
do
  cp .babelrc $SCRIPTS/../packages/$dir/.babelrc
done
